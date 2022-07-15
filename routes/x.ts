// routes/x.ts

import { RouteConfig } from "$fresh/server.ts";

const config: RouteConfig = {
    routeOverride: "/x/:module@:version/:path*",
};
