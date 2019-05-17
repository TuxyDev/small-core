const {Client, Collection} = require("discord.js");
const fs = require("fs");

async function init(client, settings) {

    client.commands = new Collection();

    const commands = await fs.readdirSync("./commands/");

    commands.forEach(command => {
        if (!command.endsWith(".js")) return;
        client.commands.set(command.split(".js")[0], require(`./commands/${command}`));
    });

    const events = await fs.readdirSync("./events/");

    events.forEach(event => {
        if (!event.endsWith(".js")) return;
        client.on(event.split(".js")[0], require(`./events/${event}`).bind(null, client));
    });

    client.login(settings.token);
    client.settings = settings;

    client.reloadCommand = (commandName) => reloadCommand(client, commandName);
    client.reloadEvent = (eventName) => reloadEvent(client, eventName);

}

async function reloadCommand(client, commandName) {
    if (!require.cache[require.resolve(`./commands/${commandName}.js`)]) return;
    delete require.cache[require.resolve(`./commands/${commandName}.js`)];
    client.commands.set(commandName, require(`./commands/${commandName}`));
}

async function reloadEvent(client, eventName) {
    if (!require.cache[require.resolve(`./events/${eventName}.js`)]) return;
    delete require.cache[require.resolve(`./events/${eventName}.js`)];
    client.removeAllListeners(eventName);
    client.on(eventName, require(`./events/${eventName}`).bind(null, client));
}

async function reloadClient(client) {
   client.destroy().then(client => init(client, require('./config')));
}

init(new Client(), require("./config"));
