const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
const rp = require('request-promise')
const ipRegex = require('ip-regex')

bot.command('start', (ctx) => {
  console.log('start', ctx.from)
  return ctx.reply('Welcome!')
})

bot.on('text', (ctx) => {
  let messageText = ctx.message.text
  if (ipRegex({exact: true}).test(messageText)) {
    let requestOptions = {
      url: 'https://ipvigilante.com/' + messageText + '/full',
      json: true
    }
    rp(requestOptions)
      .then(function (response) {
        console.log(response)
        let data = response.data
        if (response.status === 'success') {
          return ctx.reply('ipv4: ' + data.ipv4 + '\n' +
            'hostname: ' + data.hostname + '\n' +
            'continent: ' + data.continent_name + '\n' +
            'country: ' + data.country_name + '\n' +
            'city: ' + data.city_name)
        }
      }).catch(function (err) {
      return ctx.replyWithMarkdown('*Something wrong...*\nError details:\n' + JSON.stringify(err))
    })
  }
  else {
    return ctx.reply(`${ctx.message.text} is not an IP address`)
  }
})

bot.startPolling()