import { Bot,Context as GrammyContext } from 'grammy';
import { stateComposer } from "./features/state.ts";

export type Context = GrammyContext;

export function initBot(token: string) {
  const bot = new Bot(token);

  bot.use(stateComposer);

  return () => new Promise((resolve) =>
		bot.start({
			onStart: () => resolve(undefined),
		}),
	);
}
