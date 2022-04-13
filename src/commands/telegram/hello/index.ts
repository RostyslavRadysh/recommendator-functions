import { TelegramClient, TelegramTypes } from 'messaging-api-telegram'
import TelegramMessage from '@/models/telegramMessage'
import Command from '@/utils/command'

class HelloCommand implements Command {
    regex: RegExp

    constructor(private client: TelegramClient,) {
        this.regex = new RegExp('/hello')
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
        const message = 'Make your choice!'
        const replyMarkup: TelegramTypes.ReplyKeyboardMarkup = {
            keyboard: [
                [{ text: 'Button #1' }],
                [{ text: 'Button #2' }, { text: 'Button #3' }]
            ],
            resizeKeyboard: true
        }
        await this.client.sendMessage(key, message, { parseMode: TelegramTypes.ParseMode.HTML, replyMarkup })
    }
}

export default HelloCommand