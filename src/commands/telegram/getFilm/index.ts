import { TelegramClient, TelegramTypes } from 'messaging-api-telegram'
import TelegramMessage from '@/models/telegramMessage'
import Command from '@/models/command'
import Film from '@/models/film'
import filmsJson from '@/jsons/films.json'

class GetFilmCommand implements Command {
    regex: RegExp

    constructor(private client: TelegramClient,) {
        this.regex = new RegExp('(^Comedy$|^Sci-fi$|^Horror$|^Action film$|^Drama$|^Mystery$|^Thriller$|^Other$)')
    }

    async validate(body: any): Promise<boolean> {
        const request = body as TelegramMessage
        if (!request.message?.text) return false
        if (!this.regex.test(request.message.text)) return false
        if (!request.message.from?.id) return false
        return true 
    }

    async execute(body: any): Promise<void> {
        const request = body as TelegramMessage
        const films = (Object.values(JSON.parse(JSON.stringify(filmsJson))) as Film[]).filter(film => film.type === request.message?.text)
        var film = films[Math.floor(Math.random()*films.length)]
        if(!film) throw Error('The object doesn\'t exists!')
        // Get the key
        const key = (body as TelegramMessage).message?.from?.id
        if (!key) throw Error('The key doesn\'t exists!')
        // Send a message
        const message = `🔥 <b>${film.name}</b>` + '\n' +`🍿 ${film.description}`
        const replyMarkup: TelegramTypes.ReplyKeyboardMarkup = {
            keyboard: [
                [{ text: 'Games' }, { text: 'Films' }]
            ],
            resizeKeyboard: true
        }
        await this.client.sendMessage(key, message, { parseMode: TelegramTypes.ParseMode.HTML, replyMarkup })
    }
}

export default GetFilmCommand