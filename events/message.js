module.exports = async (client, message) => {

    if (message.author.bot || message.content.indexOf(client.settings.prefix) !== 0) return;

    const args = message.content.slice(client.settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if (message.guild && !message.member) await message.guild.fetchMember(message.author);
  
    const cmd = client.commands.get(command); if (!cmd) return;

    cmd(client, message, args);

}