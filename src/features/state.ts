import { Composer } from "grammy";
import type { Context } from "../bot.ts";

export const stateComposer = new Composer<Context>();

stateComposer.chatType("private").command("start", async (ctx) => {
	await ctx.reply("Hello, world!");
});

stateComposer.chatType("private").command("stop", async (ctx) => {
	await ctx.reply("Goodbye, world!");
});
