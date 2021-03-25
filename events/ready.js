const client = require('../index');
const prefix = require('../config.json').prefix;

// ready event
client.on('ready', () => {

    // creating auto changing status
    function pickStatus() {
        let status = [`for ${prefix}help`, 'for commands', 'J_ack.'];

        let statusRotate = Math.floor(Math.random() * status.length);

        client.user.setActivity(status[statusRotate], {
            type: "WATCHING"
        });
    }

    client.user.setStatus('online');

    //set the status to change every 5 seconds
    setInterval(pickStatus, 5000)

    console.log(`Logged in as ${client.user.tag}!`);
});