
const {RichEmbed} = require("discord.js");

module.exports = async (client, message, args) => {

    if (args[0]) {

        const plugin = client.plugins.find(p => p.name == args[0]);
        const embed = new RichEmbed()
        .setTitle(`${plugin.name} | version : ${plugin.version}`)
        .setDescription(plugin.description)
        .setColor(plugin.color)
        .setFooter(plugin.authors.join(", ").trim());
    
        await message.channel.send(embed);

    } else {
        const embed = new RichEmbed()
        .setTitle(`${client.plugins.size} plugins.`)
        .setDescription(client.plugins.map(p => `\`\`${p.name}\`\``).join(",").trim())
        .setColor(0xf44141)
        .setFooter("small-core by TuxyDev");
        await message.channel.send(embed);
    }

}