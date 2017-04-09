const Telegraf = require('telegraf')

const app = new Telegraf(process.env.BOT_TOKEN)
const rp  = require('minimal-request-promise')

app.command('start', (ctx) => {
    console.log('start', ctx.from)
    ctx.reply('Welcome!')
})

app.hears(/\/ip (.+)/, (ctx) => {
    let ip = ctx.match[1]
    console.log(ip)
    rp("https://ipvigilante.com/" + ip + "/full").then(
        function (res) {
            let body = res.body;
            if (body.status === "success") {
                ctx.reply(body)
            }
            else {
                ctx.reply("Error\n" + body)
            }
        }).catch(function (err) {
        ctx.reply("Error\n" + JSON.stringify(err.body))
    })
});

app.startPolling()