const {Client, Collection} = require("discord.js");
const fs = require("fs");

async function init(client, settings) {

    client.commands = new Collection();
    client.plugins = new Collection();

    const commands = await fs.readdirSync("./commands/");

    commands.forEach(command => {
        if (!command.endsWith(".js")) return;
        client.commands.set(command.split(".js")[0], require(`./commands/${command}`));
        console.log("[COMMAND] registered command: " + command);
    });

    const events = await fs.readdirSync("./events/");

    events.forEach(event => {
        if (!event.endsWith(".js")) return;
        client.on(event.split(".js")[0], require(`./events/${event}`).bind(null, client));
        console.log("[EVENT] registered event: " + event);
    });

    const plugins = await fs.readdirSync("./plugins/");

    plugins.forEach(plugin => {
        if (!plugin.endsWith(".js")) return;
        client.plugins.set(plugin, new(require(`./plugins/${plugin}`)));
    });

    client.login(settings.token);
    client.settings = settings;

    client.reloadCommand = (commandName) => reloadCommand(client, commandName);
    client.reloadEvent = (eventName) => reloadEvent(client, eventName);
    client.reloadPlugin = (pluginName) => reloadPlugin(client, pluginName);
    client.reloadClient = () => reloadClient(client);

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

async function reloadPlugin(client, pluginName) {
    if (!require.cache[require.resolve(`./plugins/${pluginName}.js`)]) return;
    delete require.cache[require.resolve(`./plugins/${pluginName}.js`)];
    client.plugins.set(pluginName, new(require(`./plugins/${pluginName}`)));
}

async function reloadClient(client) {
   client.destroy()
    .then(init(new Client(), require('./config')));
}

init(new Client(), require("./config"));
