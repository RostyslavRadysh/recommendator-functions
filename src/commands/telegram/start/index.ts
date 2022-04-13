import { TelegramClient, TelegramTypes } from 'messaging-api-telegram'
import TelegramMessage from '@/models/telegramMessage'
import Command from '@/utils/command'

class StartCommand implements Command {
    regex: RegExp

    constructor(private client: TelegramClient,) {
        this.regex = new RegExp('/start')
    }

    async validate(body: any): Promise<boolean> {
        const request = body as TelegramMessage
        return request ? true : false
    }

    async execute(body: any): Promise<void> {
        // Get the key
        const key = (body as TelegramMessage).message?.from?.id
        if (!key) throw Error('The key doesn\'t exists!')
        // Send a message
        const message = "Welcome to the telegram chat!"
        await this.client.sendMessage(key, message, { parseMode: TelegramTypes.ParseMode.HTML })
    }
}

export default StartCommand