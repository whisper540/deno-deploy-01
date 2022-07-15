// routes/plain.tsx

import {HandlerContext, Handlers} from '$fresh/server.ts';

export const handler: Handlers = {
    GET(_,ctx: HandlerContext) {
        return new Response("Hello World");
    },
};
