// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";

interface State {
    data: string;
}

export async function handler(
    req: Request,
    ctx: MiddlewareHandlerContext<State>,
) {
    ctx.state.data = "mvData";
    const resp = await ctx.next();
    resp.headers.set("server", "fresh server");
    return resp;
}
