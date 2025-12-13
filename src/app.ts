import { initBot } from "./bot.ts";

try {
	const botToken = Deno.env.get("BOT_TOKEN");
	if (!botToken) {
		throw new Error("BOT_TOKEN is not set");
	}
	const startBot = initBot(botToken);
	await startBot();
} catch (error) {
	console.error(`Failed to start bot: ${error}`);
	Deno.exit(1);
}

console.log("App started successfully");
