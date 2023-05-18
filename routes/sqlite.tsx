import { Handlers,PageProps } from "$fresh/server.ts";
import { DB } from "sqlite/mod.ts";
import ConfettiIsland from '../islands/Confetti.tsx';

interface Data {
    id: string|number;
    name: string;
}

const initDb = ():Data[]=>{
    // init sqlite
    const db = new DB("data/sqlite.db");
    // db.execute(`
    //   CREATE TABLE IF NOT EXISTS people (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     name TEXT
    //   )
    // `);
    //
    // // Run a simple query
    // for (const name of ["Peter Parker", "Clark Kent", "Bruce Wayne"]) {
    //     db.query("INSERT INTO people (name) VALUES (?)", [name]);
    // }
    // Print out data in table
    const sqlData:Data[] = [];
    for (const [id,name] of db.query("SELECT id,name FROM people")) {
        console.log(id,name);
        sqlData.push({id,name});
    }
    return sqlData;
}

export const handler: Handlers = {
    async GET(req, ctx) {
        // const data = initDb();
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
