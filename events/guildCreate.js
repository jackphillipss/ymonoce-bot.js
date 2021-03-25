const client = require('../index');
const Discord = require('discord.js');
const config = require('../config.json')
const prefix = config.prefix;

client.on('guildCreate', (guild) => {
    let channelToSendTo;

    guild.channels.cache.forEach(channel => {
        if (channel.type === 'text' && !channelToSendTo &&
            channel.permissionsFor(guild.me).has('SEND_MESSAGES')
        )
            channelToSendTo = channel;
    });

    if (!channelToSendTo);

    const newGuildEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setTitle(`Thank you for inviting ${client.user.username}`)
        .setDescription(`Use ${prefix} help to see all the commands I have !`)
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL())

    channelToSendTo.send(newGuildEmbed)
})