const encounter = require('../encounter').encounter;
const utils = require('../utils');
const config = require('../config.json');

// This file contains the handler for the !initiative command, which will get the list
// of combat participants and return an ordered list of the turn order.

/**
 * Returns a formatted list showing the initiative order.
 */
exports.run = (client, message, args) => {

    // Don't even consider showing the master list if this command isn't written in a DM.
    let master  = false;
    if (message.channel.type === 'dm') {
        // Don't allow the 'master' flag if the command was sent by some
        if (config.dmWhitelist.includes(message.author.id)) {
            master = args[0] && args[0].toLowerCase().includes('master');
        }
    }

    // Merge and sort the pcs and npcs arrays
    const initList = encounter.pcs.concat(encounter.npcs);
    initList.sort((a, b) => a.initiative - b.initiative);

    // If the DM wants the unfiltered list, don't both sorting through all the visibility
    // options
    if (master) {
        const formattedList = initList.map((e) => `${utils.entityToString(e)},`
        + `Visibility: ${utils.visibilityToString(e.visibility)}`);
        formattedList.unshift('COMBATANTS');
        message.channel.send(formattedList).catch(console.error);
        return;
    }

    // Hide anything that players aren't supposed to see.
    // Filter completely hidden entities from the list, as well as entities that are fully visible.
    const allVisibility = initList.filter((e) => e.visibility.all);

    // This list is the list of partially visible entities.
    const filteredList = initList
    .filter((e) => !e.visibility.hidden && !e.visibility.all)
    // Filter the names to generic names if the players aren't supposed to see them.
    .map((e) => !e.visibility.name ? {...e, name: `An Unknown ${e.visibility.type 
        ? utils.capitalize(e.type) : 'Combatant'}`} : e)
    // Remove initiative if the players aren't supposed to see it.
    .map((e) => !e.visibility.initiative ? {...e, initiative: '??'} : e)
    // Remove type if players aren't supposed to see it.
    .map((e) => (!e.visibility.type) ? {...e, type: 'Unknown'}
    : { ...e, type: utils.capitalize(e.type)});

    // Merge the partially and fully visible lists.
    const allFiltered = filteredList.concat(allVisibility)
    .sort((a, b) => a.initiatve = b.initiative);
    const formattedList = allFiltered.map((e) => utils.entityToString(e));
    formattedList.unshift("COMBATANTS:");
    message.channel.send(formattedList).catch(console.error);
}
