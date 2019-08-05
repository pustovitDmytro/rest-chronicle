import { getMethodNames, isPromise, isFunction } from './common';

function getMethodDescriptor(propertyName, target) {
    if (target.hasOwnProperty(propertyName)) {
        return Object.getOwnPropertyDescriptor(target, propertyName);
    }

    return {
        configurable : true,
        enumerable   : true,
        writable     : true,
        value        : target[propertyName]
    };
}

function classMethodDecorator({ methodName, descriptor, config }) {
    descriptor.value = functionDecorator.call( // eslint-disable-line no-param-reassign
        this,
        descriptor.value,
        { methodName, config }
    );

    return descriptor;
}


export function inject(methods, target) {
    function _onSuccess({ params, result, method }) {
        console.log(method, isFunction(methods[method]));
        if (isFunction(methods[method])) {
            return methods[method](params, result);
        }

        return result;
    }

    getMethodNames(methods).forEach(methodName => {
        const descriptor = getMethodDescriptor(methodName, target);

        Object.defineProperty(
            target,
            methodName,
            classMethodDecorator.call(
                this,
                {
                    methodName,
                    descriptor,
                    config : {
                        onError   : console.error,
                        onSuccess : _onSuccess,
                        chronicle : methods._chronicle
                    }
                },
            )
        );
    });

    return target;
}

export function decorate(target, config) {
    getMethodNames(target).forEach(methodName => {
        const descriptor = getMethodDescriptor(methodName, target);

        Object.defineProperty(
            target,
            methodName,
            classMethodDecorator.call(
                this,
                { methodName, descriptor, config },
            )
        );
    });

    return target;
}

function functionDecorator(method, { methodName, config }) {
    const methodData = {
        method    : methodName,
        chronicle : config.chronicle
    };

    return function (...params) {
        const data = { params, context: this, ...methodData };

        try {
            const promise = method?.apply(this, params);

            if (isPromise(promise)) {
                return promise // eslint-disable-line more/no-then
                    .then(result => config.onSuccess({ result, ...data }))
                    .catch(error => config.onError({ error, ...data }));
            }

            return config.onSuccess({ result: promise, ...data });
        } catch (error) {
            config.onError({ error, ...data });
        }
    };
}
