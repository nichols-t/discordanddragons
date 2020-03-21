const encounter = require('../encounter').encounter;
const utils = require('../utils');

// This file contains the handler for the !add command, which will add an entity to
// the current encounter.

/**
 * Parses an argument for visibility options into the correct options.
 * @param {*} input `i`, `n`, `h`, but `h` will override the other two.
 * `i` shows the entity's initiative, `n` shows the entity's name.
 */
const parseVisibility = (input) => {
    if (!input) return {};

    const lCInput = input.toLowerCase();

    if (lCInput.includes("h")) {
        return { hidden: true };
    } else {
        let visibility = {};
        if (lCInput.includes('i')) {
            visibility.initiative = true;
        }
        if (lCInput.includes('n')) {
            visibility.name = true;
        }
        if (lCInput.includes('t')) {
            visibility.type = true;
        }
        return visibility;
    }
}

/**
 * Parses the argument for type into the correct form.
 * @param {*} input must include one of `player`, `ally`, or `enemy`.
 */
const parseType = (input) => {
    const lCInput = input.toLowerCase();
    if (lCInput.includes('player')) {
        return 'player';
    } else if (lCInput.includes('ally')) {
        return 'ally';
    } else if (lCInput.includes('enemy')) {
        return 'enemy';
    } else {
        return '';
    }
}

/**
 * Parses the initiative argument into a correct number.
 * @param {*} input some number represnting initiative.
 */
const parseInitiative = (input) => {
    if (!input) return 0;
    return Math.max(Number(input), 0);
}

/**
 * Transforms a visibility type into a string.
 * @param {*} visibility the visibility of an entity.
 */
const visibilityToString = (visibility) => {
    if (utils.empty(visibility)) {
        return "ALL";
    } else {
        let str = '';
        if (visibility.hidden) return 'NONE';
        if (visibility.initiative) str += 'INITIATIVE,';
        if (visibility.name) str += 'NAME,';
        if (visibility.type) str += 'TYPE,'
        return 'UNKNOWN';
    }
}

/**
 * Adds a new entity to the encounter with the given parameters.
 */
exports.run = (client, message, args) => {
    if (args.length < 3) {
        message.channel
        .send('Command format: add <type> <name> <initiative> <visibility?>').catch(console.error);
        return;
    }
    // Argument format. [0-2] are assumed as every entity needs them.
    const name = args[1];
    const newEntity = {
        name,
        initiative: parseInitiative(args[2]),
        type: parseType(args[0]),
        visibility: parseVisibility(args[3])
    };

    if (newEntity.type !== 'player') encounter.npcs.push(newEntity);
    if (newEntity.type === 'player') encounter.pcs.push(newEntity);

    // Format this in whatever way we need to and send it back (right now we don't format)

    message.channel.send(`Added new ${newEntity.type === 'player'
    ? 'PC' : 'NPC'} ${newEntity.name}`
    + ` with Initiative: ${newEntity.initiative} and Visibility: `
    + `${visibilityToString(newEntity.visibility)}`).catch(console.error);
}
