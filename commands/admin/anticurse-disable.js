const Discord = require('discord.js');
const { Database } = require('quickmongo');
const mongoDBURL = require('../../config.json').mongoDBURL;
const quickmongo = new Database(mongoDBURL);

module.exports = {
    name: 'anticurse-disable',
    aliases: ['antiswear-disable'],
    category: 'admin',
    description: 'Disable anticurse features',

    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send('You do not have \`ADMINISTRATOR\` permissions')
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send('I do not have \`MANAGE_MESSAGES\` permissions')

        if (await quickmongo.fetch(`swear-${message.guild.id}`) === true) {
            await quickmongo.delete(`swear-${message.guild.id}`, true);
            message.channel.send('Anticurse feature has been DISABLED 🔴 !');
        } else return message.channel.send('Anticurse feature has **ALREADY BEEN DISABLED** !')
    },
};