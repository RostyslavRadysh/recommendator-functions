interface Command {
    regex: RegExp
    validate(body: any): Promise<boolean>
    execute(body: any): Promise<void>
}

export default Command