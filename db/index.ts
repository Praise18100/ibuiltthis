//import all necessary components
import { neon } from '@neondatabase/serverless'; //a serverless database (PostgreSQL ) connection (PostgreSQL via Neon)
import { drizzle } from 'drizzle-orm/neon-http';// allows you interact with the database

//if database URL does not exists throw error
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL!);//to connect to the database
export const db = drizzle({ client: sql });//to wraps the Neon client with Drizzle ORM to make db the database object
