
/**
 * Is the given object empty?
 * @param {*} obj some object.
 */
const empty = (obj) => !obj || (Object.keys(obj).length === 0);


/**
 * Returns a string representing the given entity.
 * @param {*} entity entity object.
 */
const entityToString = (entity) => {
    return `${entity.name}, Initiative: ${entity.initiative}, Side: ${entity.type}`;
}

/**
 * Transforms a visibility type into a string.
 * @param {*} visibility the visibility of an entity.
 */
const visibilityToString = (visibility) => {
    if (visibility.all) {
        return "ALL";
    } else {
        let str = '';
        if (visibility.hidden) return 'NONE';
        if (visibility.initiative) str += 'INITIATIVE,';
        if (visibility.name) str += 'NAME,';
        if (visibility.type) str += 'TYPE,'
        return (str ? str : 'UNKNOWN');
    }
}

/**
 * Guess what this does.
 * @param {*} str a string.
 */
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

module.exports = {
    entityToString,
    empty,
    visibilityToString,
    capitalize,
};
