const Discord = require('discord.js');

module.exports = {
    name: 'simleave',
    aliases: ['leave'],
    category: 'simulation',
    description: 'Simulate user leave server.',

    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMININISTRATOR')) 
        return message.channel.send('You do not have the required permissions!')

        client.on('guildMemberRemove', member => {
            message.channel.send(`${member} has left the server !`)
        })

        client.emit('guildMemberRemove', message.member);
    },
};