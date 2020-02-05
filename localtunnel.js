const localtunnel = require('localtunnel')
const { botToken } = require('./config/config')

if (!botToken) {
  console.log('Please provide BOT_TOKEN environment variable')
  process.exit(1)
}

(async () => {
  const tunnel = await localtunnel({ port: 3000 })

  console.log(`https://api.telegram.org/bot${botToken}/setWebhook?url=${tunnel.url}/bot`)

  tunnel.on('close', () => {
    // tunnels are closed
  })
})()
