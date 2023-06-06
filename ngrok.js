import {botToken} from './config/config.js'
import {ngrokToken} from './config/config.js'

import ngrok from 'ngrok'

if (!botToken) {
    console.log('Please provide BOT_TOKEN environment variable')
    process.exit(1)
}

if (!ngrokToken) {
    console.log('Please provide NGROK_TOKEN environment variable')
    process.exit(1)
}

(async () => {
    const url = await ngrok.connect({
        addr: '0.0.0.0:3000',
        authtoken: ngrokToken,
        region: 'eu'
    });

    console.log(`https://api.telegram.org/bot${botToken}/setWebhook?url=${url}/development/bot`)
})()
