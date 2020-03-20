const encounter = require('../encounter').encounter;

// This file contains the handler for the !initiative command, which will get the list
// of combat participants and return an ordered list of the turn order.

exports.run = (client, message, args) => {
    // Merge and sort the pcs and npcs arrays
    const initList = encounter.pcs.concat(encounter.npcs)
    .sort((a, b) => a.initiative > b.initiative);

    // Format this in whatever way we need to and send it back (right now we don't format)

    message.channel.send(initList.map((c) => c.name)).catch(console.error);
}
