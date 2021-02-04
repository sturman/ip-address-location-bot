const rp = require('request-promise')
const ipRegex = require('ip-regex')

module.exports = (ctx) => {
  let messageText = ctx.message.text
  if (ipRegex({ exact: true }).test(messageText)) {
    let requestOptions = {
      url: `http://ipwhois.app/json/${messageText}`,
      json: true
    }
    rp(requestOptions)
      .then((response) => {
        return ctx.reply(JSON.stringify(response, null, 2))
      }).catch((err) => {
      return ctx.replyWithMarkdown('*Something wrong...*\nError details:\n' + JSON.stringify(err))
    })
  } else {
    return ctx.replyWithMarkdown(
      `${messageText} is not an IP address. Please send IP address in correct IPv4 or IPv6 format e.g.\n\`12.34.43.21\`\n\`2001:cdba:0000:0000:0000:0000:3257:9652\``)
  }
}
