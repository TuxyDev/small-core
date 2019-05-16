module.exports = (client, message, args) => {
    client.reloadCommand(args[0]);
    message.channel.send(`reloaded command : **${args[0]}**.`)
}