const Discord = require('discord.js');
const { Database } = require('quickmongo');
const mongoDBURL = require('../../config.json').mongoDBURL;
const quickmongo = new Database(mongoDBURL);

module.exports = {
    name: 'anticurse-enable',
    aliases: ['antiswear-enable'],
    category: 'admin',
    description: 'Enable anticurse features',

    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send('You do not have \`ADMINISTRATOR\` permissions')
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send('I do not have \`MANAGE_MESSAGES\` permissions')

        if (await quickmongo.fetch(`swear-${message.guild.id}`) === null) {
            await quickmongo.set(`swear-${message.guild.id}`, true);
            message.channel.send('Anticurse feature has been ENABLED 🟢 !');
        } else if (await quickmongo.fetch(`swear-${message.guild.id}`) === false) {
            await quickmongo.set(`swear-${message.guild.id}`, true);
            message.channel.send('Anticurse feature has been ENABLED 🟢');
        } else return message.channel.send('Anticurse feature has **ALREADY BEEN ENABLED** !')
    },
};