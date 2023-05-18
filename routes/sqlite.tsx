import { Handlers,PageProps } from "$fresh/server.ts";
import { load } from "std/dotenv/mod.ts";
// import { DB } from "sqlite/mod.ts";
import { Pool } from "postgres/mod.ts";
import ConfettiIsland from '../islands/Confetti.tsx';

interface Data {
    id: string|number;
    name: string;
}

const initDb = async():Data[]=>{
    // Get the connection string from the environment variable "DATABASE_URL"
    const env = await load();
    const databaseUrl = env["DATABASE_URL"];
    // const databaseUrl = Deno.env.get("DATABASE_URL")!;

    // Create a database pool with three connections that are lazily established
    const pool = new Pool(databaseUrl, 3, true);

    // Connect to the database
    const connection = await pool.connect();

    try {
        // Create the table
        await connection.queryObject`
              CREATE TABLE IF NOT EXISTS people (
                id INTEGER PRIMARY KEY,
                name TEXT
              )
        `;
        // Run a simple query
        // for (const name of ["Peter Parker", "Clark Kent", "Bruce Wayne"]) {
        //     await connection.queryObject(`INSERT INTO people (name) VALUES ("${name}")`);
        // }
    } finally {
        // Release the connection back into the pool
        connection.release();
    }

    // Print out data in table
    const sqlData:Data[] = [];
    const tmpSql = await connection.queryArray`SELECT id,name FROM people`;
    for (const [id,name] of tmpSql.rows) {
        sqlData.push({id,name});
    }
    return sqlData;
}

export const handler: Handlers = {
    async GET(req, ctx) {
        const data = await initDb();
        const resp = await ctx.render(data);
        resp.headers.set("X-Custom-Header", "Hello");
        return resp;
    },
};

export default function AboutPage({ data }: PageProps<Data[] | null>) {
    if (!data) {
        return <h1>User not found</h1>;
    }

    return (
        <main>
            <h1>Sqlite</h1>
            <p>This is the sqlite page.</p>
            <ConfettiIsland />
            <ul>
                {data.map((item) => <li key={item.id}>{item.name}</li>)}
            </ul>
        </main>
    );
}
