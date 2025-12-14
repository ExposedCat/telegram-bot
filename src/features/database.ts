import { type Collection, type Db, type Document, MongoClient } from "mongodb";
import type { Chat } from "./chat.ts";

export type Database = {
	chat: Collection<Chat>;
};

async function ensureCollection<T extends Document>(
	database: Db,
	name: string,
): Promise<Collection<T>> {
	const exists = await database.listCollections({ name }).hasNext();
	if (exists) {
		return database.collection<T>(name);
	}

	return database.createCollection<T>(name, {
		validator: {
			$jsonSchema: {},
		},
	});
}

export function initDatabase() {
	const uri = Deno.env.get("DB_");
	if (!uri) {
		throw new Error("MONGODB_URI is not set");
	}

	const client = new MongoClient(uri);

	const connect = async (): Promise<Database> => {
		await client.connect();

		const db = client.db();
		const chat = await ensureCollection<Chat>(db, "chat");
		const database: Database = { chat };

		return database;
	};

	return connect;
}
