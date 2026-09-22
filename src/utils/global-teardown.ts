import { Logger } from './logger'
import { CLEAN_DB_URL, INIT_DB_URL } from '@constants/api.constant';

const globalTeardown = async() => {
    Logger.info("Cleaning up parabank db...");
    await fetch(CLEAN_DB_URL, { method: 'POST' });
    await fetch(INIT_DB_URL, { method: 'POST' });
    Logger.info("Database reset completed")
}

export default globalTeardown;