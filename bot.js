import {Telegraf} from "telegraf";
import {botToken} from "./config/config.js";


if (botToken === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(botToken)

import startMiddleware from './middleware/start.middleware.js'
import helpMiddleware from './middleware/help.middleware.js'
import ipMiddleware from './middleware/ip.middleware.js'

bot.start(startMiddleware)
bot.help(helpMiddleware)
bot.on('text', ipMiddleware)

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

export const handler = (event, context, callback) => {
  console.log(event.body)
  const body = JSON.parse(event.body) // get data passed to us

  bot.handleUpdate(body)
  return callback(null, {
    statusCode: 200,
    body: ''
  })
}
