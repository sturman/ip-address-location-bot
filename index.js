const Telegraf = require('telegraf')

const app = new Telegraf(process.env.BOT_TOKEN)

app.command('start', (ctx) => {
    console.log('start', ctx.from)
    ctx.reply('Welcome!')
})

app.hears('hi', (ctx) => ctx.reply('Hey there!'))

app.on('sticker', (ctx) => ctx.reply('👍'))

app.startPolling()