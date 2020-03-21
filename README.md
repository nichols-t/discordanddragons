# discordanddragons
Discord bot(s) for facilitating remote D&amp;D sessions. For now, contains one bot to track initiative order in combat.

## Running

First, you'll need to [create your own Discord bot](https://discordapp.com/developers/applications/). First create an application,
then add a bot via the menu on the left. Copy the token into a file named `config.json` inside the `initiativebot` directory.

Your config.json will need:
- `token` containing the bot's auth token from discord
- `prefix` a string for your chosen command prefix
- `dmWhitelist` array of discord user ids (these are numbers; not the same as `<username><ident>`)

Here's what your `config.json` should look like when you're finished:

```JSON
{
    "token": "<your-token-here>",
    "prefix" : "!",
    "dmWhitelist" : ["<dm-user-id>"]
}
```

Then be sure to run `npm install` in the `initiativebot` directory to install your modules. Run `node index.js` in the `initativebot` directory to run the bot.

## Functionality

- [`!initiative`](#initiative)
- [`!add`](#add)
- [`!remove`](#remove)

### `!initiative`

```
!initiative <master?>
```

Displays a formatted list of combatants in the current encounter. The DM can DM the bot with the `'master'` flag to show all entities with their visibility options.

Example: 

```
(Anywhere)
bjorn: !initiative
discordanddragonsbot: COMBATANTS:
Tiberius, Initiative 4, Side: Unknown
Bjorn, Initiative 22, Side: Player
Skeleton, Initiative 50, Side: Enemy

(In DM)
bjorn: !initiative master
discordanddragonsbot: COMBATANTS:
Tiberius, Initiative 4, Side: Unkown, Visibility: NAME,INITIATIVE,
Skeleton, Initiative 10, Side: Enemy, Visibility: HIDDEN
Skeleton, Initiative 14, Side: Enemy, Visibility: HIDDEN
Skeleton, Initiative 18, Side: Enemy, Visibility: HIDDEN
Bjorn, Inititative 22, Side: Player, Visibility: ALL
Skeleton, Initiative 50, Side: Enemy, Visibility: ALL
```

### `!add`

```
!add <type> <name> <initiative> <visibility-string?>
```
This command can only be run by the DM in a DM. Adds an entity to the list of combatants in the encounter. Must be given a type (one of player/ally/enemy), a name, and an initiative score. Can also be given several visibility options; if none are specified, all fields are visible to players.

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
This command can only be run by the DM in a DM. Removes the entity with the given name from the given type of list. `type` can be one of player, 'ally', or 'enemy'. If any type that is not 'player' is specified, it will search for the name in the NPC list.

Example: 

```
bjorn: !remove ally Tiberius
discordanddragonsbot: Removed Tiberius from npcs

bjorn: !remove player aurgrum
discordanddragonsbot: Did not find entity with name aurgrum in pcs
```