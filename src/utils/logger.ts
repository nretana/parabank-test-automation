import { LogLevel } from '@@types/log-level';
export class Logger {
    private static currentLevel: LogLevel = this.getCurrentLogLevel();

    private static getCurrentLogLevel(): LogLevel{
        const currentVal = process.env.LOG_LEVEL as LogLevel
        return (currentVal === "INFO" || currentVal === "DEBUG" || currentVal == "WARN" || currentVal == "ERROR") ? currentVal : "INFO" 
    }

    private static timestamp(): string {
        return new Date().toISOString();
    }

    private static format(message: string): string {
        return `[${this.timestamp()}] [${this.currentLevel}] ${message}`;
    }

    static info(message: string){
        console.info(this.format(message))
    }

    static debug(message: string): void {
        if (process.env.LOG_LEVEL === 'DEBUG') {
            console.debug(this.format(message));
        }
    }

    static warn(message: string): void {
        if (process.env.LOG_LEVEL === 'WARN') {
            console.warn(this.format(message));
        }
    }

    static error(message: string, error?: unknown): void {
        if (process.env.LOG_LEVEL === 'ERROR') {
            console.error(this.format(message));

            if (error instanceof Error) {
                console.error(error.stack);
            }
        }
    }

    /*static success(message: string): void {
        console.log(this.format('SUCCESS', message));
    }

    static assertion(message: string): void {
        console.log(this.format('ASSERT', message));
    }

    static api(message: string): void {
        console.log(this.format('API', message));
    }*/
} 