/**
 * Strips the file path and file extension from each key.
 * Watch out for collisions, as files with the same name and extension will overwrite eachother.
 * @param {object} modules 
 * @returns {object}
 */
export function normalizeModules(modules) {
    return Object.fromEntries(
        Object.entries(modules).map(([path, value]) => {
            const name = path
                .split("/")
                .pop()
                .replace(/\.\w+$/, "");
            return [name, value];
        })
    );
}

/**
 * Fetch all sprites belonging to a specific helper. We assume (1): for each "idle" sprite,
 * there is a corresponding "mine" sprite, and (2): each file name follows the naming convention "[prefix]-['idle' | 'mine']-[level]"
 * @param {number} levelCount 
 * @param {string} prefix 
 * @returns {{idle: string[], mine: string[]}}
 */
function getHelperSprites(modules, prefix) {
    const sprites = {idle: [], mine: []};

    let i = 0;
    while (modules[prefix + '-idle-' + i] && modules[prefix + '-mine-' + i]) {
        sprites.idle.push(modules[prefix + '-idle-' + i]);
        sprites.mine.push(modules[prefix + '-mine-' + i]);
        i++;
    }

    if(sprites.idle.length === 0 || sprites.mine.length === 0) {
        throw new Error('Unable to find any sprites for helper: ' + prefix + ' at index: ' + i);
    }

    return sprites;
}

export function buildHelperSpriteObj(modules, template) {
    const helperObj = {};
        Object.entries(template).forEach(([key, value]) => {
            helperObj[key] = getHelperSprites(modules, value);
        });
    return helperObj;
}