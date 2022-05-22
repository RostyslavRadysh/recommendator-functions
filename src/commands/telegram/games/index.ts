import { TelegramClient, TelegramTypes } from 'messaging-api-telegram';
import TelegramMessage from '@/models/telegramMessage';
import Command from '@/models/command';

class GamesCommand implements Command {
    regex: RegExp;

    constructor(private client: TelegramClient) {
        this.regex = new RegExp('(^\/games$|^Games$)');
    }

    async validate(body: any): Promise<boolean> {
        const request = body as TelegramMessage;
        if (!request.message?.text)  return false;
        if (!this.regex.test(request.message.text)) return false;
        if (!request.message.from?.id) return false;
        return true;
    }

    async execute(body: any): Promise<void> {
        // Get the key
        const key = (body as TelegramMessage).message?.from?.id;
        if (!key)
            throw Error('The key doesn\'t exists!');
        // Send a message
        const message = 'Choose what game\'s genre you like ❤️';
        const replyMarkup: TelegramTypes.ReplyKeyboardMarkup = {
            keyboard: [
                [{ text: 'Action' }, { text: 'Action-Adventure' }],
                [{ text: 'Adventure' }, { text: 'Role-playing' }],
                [{ text: 'Simulation' }, { text: 'Strategy' }],
                [{ text: 'MMO' }, { text: 'Sports' }]
            ],
            resizeKeyboard: true
        };
        await this.client.sendMessage(key, message, { parseMode: TelegramTypes.ParseMode.HTML, replyMarkup });
    }
}

export default GamesCommand
