import { Logger } from "@utils/logger";
import { CLEAN_DB_URL, INIT_DB_URL } from "@constants/api.constant";
import { test as teardown } from "@playwright/test";

teardown("Cleaning up Parabank db", { tag: ["@regression", "@smoke", "@security", "@accessibility", "@performance"] }, async () => {
  Logger.info("Cleaning up parabank db...");
  await fetch(CLEAN_DB_URL, { method: "POST" });
  await fetch(INIT_DB_URL, { method: "POST" });
  Logger.info("Database reset completed");
});
