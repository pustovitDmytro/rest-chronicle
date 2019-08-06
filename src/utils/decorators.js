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
        if (isFunction(methods[`after_${method}`])) {
            return methods[`after_${method}`](params, result);
        }
        if (isFunction(methods[method])) {
            return methods[method](params, result);
        }

        return result;
    }

    function _onParams({ params, method }) {
        if (isFunction(methods[`before_${method}`])) {
            return methods[`before_${method}`](params);
        }

        return params;
    }

    [
        ...getMethodNames(methods),
        ...getMethodNames(target)
    ]
        .forEach(methodName => {
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
                            onParams  : _onParams,
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

    return function (...args) {
        const params = config.onParams({ params: args, context: this, ...methodData });
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
