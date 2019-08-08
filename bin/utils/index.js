function docoptKey(key) {
    const patterns = [ /--(.+)/, /<(.+)>/ ];

    for (const pattern of patterns) {
        const match = key.match(pattern);

        if (match && match.index === 0) {
            return match[1];
        }
    }
}

export function buildDocoptParams(opts, { include, exclude } = {}) {
    const clean = {};

    Object.keys(opts)
        .map(raw => ({ raw, key: docoptKey(raw) }))
        .filter(
            ({ key }) => (include ? include.includes(key) : true)
             && (exclude ? !exclude.includes(key) : true)
        ).forEach(({ raw, key }) => {
            clean[key] = opts[raw];
        });

    return clean;
}
