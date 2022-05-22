import {TelegramClient} from 'messaging-api-telegram';
import TelegramMessage from '@/models/telegramMessage';
import Command from '@/models/command';
import Game from '@/models/game'
import gamesJson from '@/jsons/games.json'

class Games implements Command {
    regex: RegExp;

    constructor(private client: TelegramClient) {
        this.regex = new RegExp('(Action|Action-Adventure|Adventure|Role-playing|Simulation|Stratery|MMO|Sports)');
    }

    async validate(body: any): Promise<boolean> {
        const request = body as TelegramMessage;
        if (!request.message?.text) return false;
        if (!this.regex.test(request.message.text)) return false;
        if (!request.message.from?.id) return false;
        return true;
    }

    async execute(body: any): Promise<void> {
        const games = (Object.values(JSON.parse(JSON.stringify(gamesJson))) as Game[]);
        var recommended_game = games[Math.floor(Math.random()*games.length)];
        // Get the key
        const key = (body as TelegramMessage).message?.from?.id;
        if (!key)  throw Error('The key doesn\'t exists!');
        // Send a message
        const message = recommended_game?.name + 'is the game I recommend you <3. ' + recommended_game?.description;
        await this.client.sendMessage(key, message);
    }
}

export default Games
