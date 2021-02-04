const { Telegraf } = require('telegraf')
const { botToken } = require('./config/config')

const bot = new Telegraf(botToken)

const startMiddleware = require('./middleware/start.middleware')
const helpMiddleware = require('./middleware/help.middleware')
const ipMiddleware = require('./middleware/ip.middleware')

bot.start(startMiddleware)
bot.help(helpMiddleware)
bot.on('text', ipMiddleware)

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

exports.handler = (event, context, callback) => {
  console.log(event.body)
  const body = JSON.parse(event.body) // get data passed to us

  bot.handleUpdate(body)
  return callback(null, {
    statusCode: 200,
    body: ''
  })
}
