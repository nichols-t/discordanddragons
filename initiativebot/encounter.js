// This file contains the object used to track the current encounter. This object will
// be reset whenever the bot restarts, or a command is given. Please be careful with it!

/**
 * The current encounter information. This should be blank, but has a couple entries
 * for testing purposes.
 */
const encounter = {
    pcs: [{ name: 'Bjorn', initiative: 22, type: 'player' },
{name: 'Tiberius', initiative: 4, type: 'player', visibility: { name: true, initiative: true, type: false}}],
    npcs: [{ name: 'Sumail', initiative: 28, type: 'enemy' },
{name: 'Hidden dude', initiative: 400, type: 'enemy', visibility: {hidden: true}}],
};

module.exports = {
    encounter,
}