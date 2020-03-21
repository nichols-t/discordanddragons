const encounter = require('../encounter').encounter;
const config = require('../config');

// This file contains the handler for the !remove command, which will remove an entity from
// the current encounter.

/**
 * Parses the arg string for list into the name of one of `encounter`'s lists.
 * @param {*} list arg string: player or npc
 */
const parseList = (list) => {
    const lcList = list.toLowerCase();
    if (lcList.includes('player')) {
        return 'pcs';
    } else {
        return 'npcs';
    }
}

/**
 * Removes an entity of the given type (pc or npc) from the encounter list.
 */
exports.run = (client, message, args) => {

    // Don't acknowledge this command if it wasn't send in and by a DM.
    if (message.channel.type !== 'dm' || !config.dmWhitelist.includes(message.author.id)) {
        return;
    }

    if (args.length < 2) {
        message.channel.send('\`Command format: remove <type> <name>\`').catch(console.error);
        return;
    }

    const list = parseList(args[0]);
    const name = args[1];
    
    const indexToRemove = encounter[list]
    .findIndex((e) => e.name.toLowerCase() === name.toLowerCase());
    if (indexToRemove > -1) {
        encounter[list].splice(indexToRemove);
    }
    // Format this in whatever way we need to and send it back (right now we don't format)

    message.channel.send(indexToRemove > -1 ? `\`Removed "${name}" from ${list}\``
    : `\`Did not find entity "${name}" in ${list
        .toUpperCase().substring(0, list.length - 1)}s\` `).catch(console.error);
}
