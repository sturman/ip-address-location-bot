const helpText = `Just send me an IP address for which you would like to know a location e.g. 
\`12.34.43.21\`
\`2001:cdba:0000:0000:0000:0000:3257:9652\``

module.exports = (ctx, next) => {
  return ctx.replyWithMarkdown(helpText)
}
