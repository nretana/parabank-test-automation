

export class Logger {

    private static timestamp(): string {
        return new Date().toISOString();
    }

    private static format(level: string, message: string): string {
        return `[${this.timestamp()}] [${level}] ${message}`;
    }

    static info(message: string){
        console.info(this.format('INFO', message))
    }

    static debug(message: string): void {
        if (process.env.DEBUG === 'true') {
            console.debug(this.format('DEBUG', message));
        }
    }

    static warn(message: string): void {
        console.warn(this.format('WARN', message));
    }

    static error(message: string, error?: unknown): void {
        console.error(this.format('ERROR', message));

        if (error instanceof Error) {
            console.error(error.stack);
        }
    }

    static success(message: string): void {
        console.log(this.format('SUCCESS', message));
    }

    static assertion(message: string): void {
        console.log(this.format('ASSERT', message));
    }

    static api(message: string): void {
        console.log(this.format('API', message));
    }
} 