const client = require('../index');
const Discord = require('discord.js');
//create ping collection
const Pings = new Discord.Collection();

client.on("message", (message) => {
    const mentionedMember = message.mentions.members.first()

    if (!mentionedMember) return;
    if (!mentionedMember.id === message.author.id) return;
    const timeout = 60000;
    Pings.set(`Pinged : ${mentionedMember.id}`, Date.now() + timeout);

    setTimeout(() => {
        Pings.delete(`Pinged : ${mentionedMember.id}`);
    }, timeout)
});

client.on('messageDelete', (message) => {
    const mentionedMember = message.mentions.members.first()

    if (!mentionedMember) return;
    if (!mentionedMember.id === message.author.id) return;

    const ghostPingsLogsChannel = message.guild.channels.cache.find(ch => ch.name.includes('ghostping'));

    if (Pings.has(`Pinged : ${mentionedMember.id}`)) {
        const ghostPingDetectedEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('GHOST PING DETECTED')
            .addField('Author', message.author)
            .addField('Message Content', message.content)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())

        ghostPingsLogsChannel.send(ghostPingDetectedEmbed);
    }
});