import { AzureFunction, Context } from '@azure/functions'
import { TelegramClient } from 'messaging-api-telegram'
import StartCommand from '@/commands/telegram/start'
import FilmsCommand from '@/commands/telegram/films'
import GamesCommand from '@/commands/telegram/games'
import GetFilmCommand from '@/commands/telegram/getFilm'
import GetGameCommand from '@/commands/telegram/getGame'

export const webhook: AzureFunction = async function (context: Context): Promise<void> {
    // Get Bindings
    const token = String(context.bindingData['token'])
    const body = context.req?.body
    // Create Dependencies
    const client = new TelegramClient({ accessToken: token })
    try {
        // Validate & execute the commands
        const commands = [
            new StartCommand(client),
            new FilmsCommand(client),
            new GamesCommand(client),            
            new GetFilmCommand(client),
            new GetGameCommand(client)
        ]
        for await (const command of commands) {
            if (await command.validate(body)) await command.execute(body)
        }
    }
    catch (error) {
        // Log the error
        const message = (error as Error).message
        context.log.error(message)
    }
    context.res = {
        statusCode: 204
    }
}