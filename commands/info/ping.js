const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['checkping', 'pingcheck', 'botspeed', 'botsping', 'botping'],
    category: 'info',
    description: 'Bot Ping',

    run : async(client, message, args) => {
        const msg = await message.channel.send('Pininging...');
        const pingEmbed = new Discord.MessageEmbed()
        .setTitle('Pong !')
        .setDescription(`${client.ws.ping}`)
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL())

        await message.channel.send(pingEmbed)
        msg.delete()
    }
}