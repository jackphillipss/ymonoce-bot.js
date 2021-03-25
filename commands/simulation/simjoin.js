const Discord = require('discord.js');

module.exports = {
    name: 'simjoin',
    aliases: ['join'],
    category: 'simulation',
    description: 'Simulate user join server.',

    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMININISTRATOR')) 
        return message.channe.send('You do not have the required permissions!')

        client.on('guildMemberAdd', member => {
            message.channel.send(`${member} has joined the server !`)
        })

        client.emit('guildMemberAdd', message.member);
    },
};