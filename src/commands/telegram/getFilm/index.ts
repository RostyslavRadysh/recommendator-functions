import { TelegramClient } from 'messaging-api-telegram'
import TelegramMessage from '@/models/telegramMessage'
import Command from '@/models/command'
import Film from '@/models/film'
import filmsJson from '@/jsons/films.json'

class GetFilmCommand implements Command {
    regex: RegExp

    constructor(private client: TelegramClient,) {
        this.regex = new RegExp('(Comedy|Sci-fi|Horror|Action film|Drama|Mystery|Thriller|Other)')
    }

    async validate(body: any): Promise<boolean> {
        const request = body as TelegramMessage
        if (!request.message?.text) return false
        if (!this.regex.test(request.message.text)) return false
        if (!request.message.from?.id) return false
        return true 
    }

    async execute(body: any): Promise<void> {
        const films = (Object.values(JSON.parse(JSON.stringify(filmsJson))) as Film[])
        var recommendedFilm = films[Math.floor(Math.random()*films.length)]
        if(!recommendedFilm) throw Error('The object doesn\'t exists!')
        // Get the key
        const key = (body as TelegramMessage).message?.from?.id
        if (!key) throw Error('The key doesn\'t exists!')
        // Send a message
        const message = recommendedFilm.name + 'This is the film I recommend you to watch.' + recommendedFilm.description
        await this.client.sendMessage(key, message)
    }
}

export default GetFilmCommand