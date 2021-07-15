import {
    getMethodNames,
    FunctionDecorator as BaseFunctionDecorator,
    ClassMethodDecorator as BaseClassMethodDecorator,
    ClassDecorator as BaseClassDecorator
} from 'myrmidon';

class FunctionDecorator extends BaseFunctionDecorator {
    onParams(opts) {
        const { methodName } = opts;
        const { methods } = this.config;
        const injectMethodNames = getMethodNames(methods);

        const onParamsMethod = injectMethodNames.find(m => m === `before_${methodName}`);

        if (onParamsMethod) return methods[onParamsMethod](opts);

        return super.onParams(opts);
    }

    onSuccess(opts) {
        const { methodName } = opts;
        const { methods } = this.config;
        const injectMethodNames = getMethodNames(methods);

        const onSuccessMethod = injectMethodNames.find(m => m === `after_${methodName}`);

        if (onSuccessMethod) return methods[onSuccessMethod](opts);

        return super.onSuccess(opts);
    }
}

class ClassMethodDecorator extends BaseClassMethodDecorator {
    static FunctionDecorator = FunctionDecorator
}

class ClassDecorator extends BaseClassDecorator {
    static ClassMethodDecorator = ClassMethodDecorator

    getClassMethodDecoratorConfig(params) {
        const { target } = params;

        return {
            ...super.getClassMethodDecoratorConfig(params),
            serviceName : target.constructor.name
        };
    }

    getFunctionDecoratorConfig({ target }) {
        const { methods } = this.config;

        return {
            ...super.getFunctionDecoratorConfig({ target }),
            chronicle : methods._chronicle
        };
    }

    get injectMethodNames() {
        const { methods } = this.config;

        return getMethodNames(methods);
    }

    filterMethodName(name) {
        const injectMethodNames = this.injectMethodNames;
        const onParamsMethod = injectMethodNames.find(m => m === `before_${name}`);
        const onSuccessMethod = injectMethodNames.find(m => m === `after_${name}`);

        return onParamsMethod || onSuccessMethod;
    }

    decorateClass(target) {
        const { methods } = this.config;
        const injectMethodNames = getMethodNames(methods);

        for (const methodName of injectMethodNames
            .filter(name => !name.includes('before_') && !name.includes('after_'))) {
            // eslint-disable-next-line no-param-reassign
            target[methodName] = methods[methodName];
        }

        return super.decorateClass(target);
    }

    decorateFunction(target) {
        const { methods } = this.config;
        const injectMethodNames = getMethodNames(methods);
        const decorated = super.decorateFunction(target);

        for (const methodName of injectMethodNames
            .filter(name => !name.includes('before_') && !name.includes('after_'))) {
            // eslint-disable-next-line no-param-reassign
            decorated[methodName] = methods[methodName];
        }

        return decorated;
    }
}

export function decorate(target, methods) {
    const decorator = new ClassDecorator({ config: { methods } });

    return decorator.decorate(target);
}
