const encounter = require('../encounter').encounter;
const utils = require('../utils');

// This file contains the handler for the !initiative command, which will get the list
// of combat participants and return an ordered list of the turn order.

/**
 * Returns a formatted list showing the initiative order.
 */
exports.run = (client, message, args) => {
    // Merge and sort the pcs and npcs arrays
    const initList = encounter.pcs.concat(encounter.npcs);
    initList.sort((a, b) => a.initiative - b.initiative);
    console.dir(initList);

    // Format this in whatever way we need to and send it back

    // Hide anything that players aren't supposed to see.
    // Filter completely hidden entities from the list.
    const filteredList = initList
    .filter((e) => utils.empty(e.visibility) || !e.visibility.hidden)
    // Filter the names to generic names if the players aren't supposed to see them.
    .map((e) => (!utils.empty(e.visibility) && !e.visibility.name)
    ? {...e, name: `An Unknown ${utils.empty(e.visibility)
        || e.visibility.type ? e.type : 'Combatant'}`} : e)
    // Remove initiative if the players aren't supposed to see it.
    .map((e) => (!utils.empty(e.visibility) && !e.visibility.initiative)
    ? {...e, initiative: '??'} : e)
    // Remove type if players aren't supposed to see it.
    .map((e) => (!utils.empty(e.visibility) && !e.visibility.type) ? {...e, type: 'Unknown'}: e);

    const formattedList = filteredList.map((e) => utils.entityToString(e));
    formattedList.unshift("COMBATANTS:");
    message.channel.send(formattedList).catch(console.error);
}
