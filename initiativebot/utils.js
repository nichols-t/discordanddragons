
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

module.exports = {
    entityToString,
    empty,
};
