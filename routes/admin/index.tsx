import {HandlerContext, Handlers} from '$fresh/server.ts';

export const handler: Handlers<any, { data: string }> = {
    GET(_req, ctx: HandlerContext) {
        return new Response(`admin page.
        middleware data is ==${ctx.state.data}==`);
    },
};
