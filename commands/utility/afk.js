const Discord = require('discord.js');
const { Database } = require('quickmongo');
const mongoDBURL = require('../../config.json').mongoDBURL;
const quickmongo = new Database(mongoDBURL);

module.exports = {
    name: 'afk',
    category: 'utility',
    description: 'Set Status to AFK',

    run: async (client, message, args) => {
        let reason = args.join(' ');
        const AFKPrefix = '[AFK] ';

        if (!reason) reason = 'No AFK reason provided';

        //set afk status(add to Database)
        try {
            await quickmongo.set(`afk-${message.author.id}+${message.guild.id}`, reason);
            message.channel.send('You have set your status to AFK.')
        } catch (err) {
            console.log(err)
            message.channel.send('Could not set AFK status');
        }

        // set nickname
        try {
            await message.member.setNickname(AFKPrefix + message.member.user.username)
        } catch (err) {
            console.log(err)
            message.channel.send('Cannot set nickname')
        }
    }
};