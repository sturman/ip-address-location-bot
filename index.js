const Telegraf = require('telegraf');

const app = new Telegraf(process.env.BOT_TOKEN);
const rp  = require('request-promise');

app.command('start', (ctx) => {
    console.log('start', ctx.from);
    return ctx.reply('Welcome!')
})

app.hears(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/, (ctx) => {
    let ip = ctx.match[0];
    // console.log(ip)
    function prepareRequestOptions(ipAddress) {
        return {
            url : "https://ipvigilante.com/" + ipAddress + "/full",
            json: true
        };
    }

    rp.get(prepareRequestOptions(ip))
        .then(function (res) {
            console.log(res);
            let data = res.data;
            if (res.status === 'success') {
                return ctx.reply('ipv4: ' + data.ipv4 + '\n' +
                    'hostname: ' + data.hostname + '\n' +
                    'continent: ' + data.continent_name + '\n' +
                    'country: ' + data.country_name + '\n' +
                    'city: ' + data.city_name)
            }
        }).catch(function (err) {
        return ctx.reply("Error\n" + JSON.stringify(err))
    })
});

app.startPolling()