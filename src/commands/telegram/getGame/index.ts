import { TelegramClient, TelegramTypes } from 'messaging-api-telegram';
import TelegramMessage from '@/models/telegramMessage';
import Command from '@/models/command';
import Game from '@/models/game'
import gamesJson from '@/jsons/games.json'

class Games implements Command {
    regex: RegExp;

    constructor(private client: TelegramClient) {
        this.regex = new RegExp('(^Action$|^Action-Adventure$|^Adventure$|^Role-playing$|^Simulation$|^Strategy$|^MMO$|^Sports$)');
    }

    async validate(body: any): Promise<boolean> {
        const request = body as TelegramMessage;
        if (!request.message?.text) return false;
        if (!this.regex.test(request.message.text)) return false;
        if (!request.message.from?.id) return false;
        return true;
    }

    async execute(body: any): Promise<void> {
        const request = body as TelegramMessage
        const games = (Object.values(JSON.parse(JSON.stringify(gamesJson))) as Game[]).filter(game => game.type === request.message?.text)
        var game = games[Math.floor(Math.random()*games.length)];
        if(!game) throw Error('The object doesn\'t exists!')
        // Get the key
        const key = (body as TelegramMessage).message?.from?.id;
        if (!key)  throw Error('The key doesn\'t exists!');
        // Send a message
        const message = `🔥 <b>${game.name}</b>` + '\n' +`🎮 ${game.description}`
        const replyMarkup: TelegramTypes.ReplyKeyboardMarkup = {
            keyboard: [
                [{ text: 'Games' }, { text: 'Films' }]
            ],
            resizeKeyboard: true
        }
        await this.client.sendMessage(key, message, { parseMode: TelegramTypes.ParseMode.HTML, replyMarkup });
    }
}

export default Games
