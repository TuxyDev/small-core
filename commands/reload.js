module.exports = async (client, message, args) => {
    if (!args[0]) {
        message.channel.send("reloading the client ...");
        await client.reloadClient();
    } else {
        client.reloadCommand(args[0]);
        message.channel.send(`reloaded command : **${args[0]}**.`)
    }
}