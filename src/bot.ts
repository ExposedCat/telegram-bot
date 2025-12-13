import { Bot, type Context as GrammyContext } from "grammy";
import { I18n, type I18nFlavor } from "grammy-i18n";
import { stateComposer } from "./features/state.ts";

export type Context = GrammyContext & I18nFlavor;

export function initBot(token: string) {
	const bot = new Bot<Context>(token);

	const i18n = new I18n<Context>({
		directory: "locales",
		defaultLocale: "en",
	});

	bot.use(i18n);

	bot.use(stateComposer);

	bot.catch(console.error);

	return () =>
		new Promise((resolve) =>
			bot.start({
				onStart: () => resolve(undefined),
			}),
		);
}
