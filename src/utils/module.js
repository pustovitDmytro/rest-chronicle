
export const PeerDependency = {
    X : class PeerDependencyX extends Error {
        constructor(error) {
            super(error.message);
            this.name = 'MISSING_PEER_DEPENDENCY';
            this.original = error;
        }
    },

    load(moduleName) {
        try {
            // eslint-disable-next-line security/detect-non-literal-require
            return require(moduleName);
        } catch (error) {
            return new this.X(error);
        }
    },

    check(module) {
        if (module instanceof this.X) throw module.original;
    }
};
