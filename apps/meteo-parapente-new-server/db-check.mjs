import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sql } from 'drizzle-orm';

const sqlite = new Database('dev.db');
const db = drizzle(sqlite);

await db.run(sql`create table if not exists provider (key text primary key, name text not null)`);
await db.run(sql`insert into provider (key, name) values (${'meteo-blue'}, ${'Meteo Blue'})`);
const rows = await db.all(sql`select * from provider`);
console.log('Rows:', rows);
