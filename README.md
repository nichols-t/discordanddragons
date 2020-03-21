# discordanddragons
Discord bot(s) for facilitating remote D&amp;D sessions.

## Running

First, you'll need to [create your own Discord bot](https://discordapp.com/developers/applications/). First create an application,
then add a bot via the menu on the left. Copy the token into a file named `config.json` inside the `initiativebot` directory.
You'll also need to set a prefix for your commands in this directory. Here's what your `config.json` should look like:

```JSON
{
    "token": "<your-token-here>",
    "prefix" : "!"
}
```

Then be sure to run `npm install` in the `initiativebot` directory to install your modules. Run `node index.js` to run the bot.

## Functionality

Right now, pretty limited.

### `!initiative`

Displays a formatted list of combatants in the current encounter. Right now, this will always filter to the player list;
it will not show hidden properties of entities that the DM does not want to reveal to the party.

Example: 

```
bjorn: !initiative
discordanddragonsbot: COMBATANTS:
Tiberius, Initiative 4, Side: Unknown
Bjorn, Initiative 22, Side: player
Skeleton, Initiative 50, Side: enemy
```

### `!add`

```
!add <type> <name> <initiative> <visibility-string>
```

Adds an entity to the list of combatants in the encounter. Must be given a 
type (one of player/ally/enemy), a name, and an initiative score. Can also be
given several visibility options; if none are specified, all fields are visible to players.

Visibility Options:
- `i` to show initiative score
- `n` to show name
- `t` to show type
- `h` to completely hide the entity (overrides other options)

Combine one or more visibility options as you choose.

Example: 

```
bjorn: !add ally Tiberius 14
discordanddragonsbot: Added new NPC Tiberius with Initiative: 14 and Visibility: ALL

bjorn: !add enemy Beholder 24 ni
discordanddragonsbot: Added new NPC Behold with Initiative: 24 and Visibility: NAME, INITIATIVE,
```

### `!remove`

```
!remove <type> <name>
```
Removes the entity with the given name from the given type of list. `type` can be one of player, 'ally', or 'enemy'. If any type that is not 'player' is specified, it will search for the name in the NPC list.

Example: 

```
bjorn: !remove ally Tiberius
discordanddragonsbot: Removed Tiberius from npcs

bjorn: !remove player aurgrum
discordanddragonsbot: Did not find entity with name aurgrum in pcs
```