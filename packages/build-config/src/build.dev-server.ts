import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {BuildOptions} from "./types/types";

export function buildDevServer({port, open}: BuildOptions): DevServerConfiguration {
  const config: DevServerConfiguration = {
    port: port ?? 3000,
    historyApiFallback: true, // works only for dev server. for nginx you need to proxy all request to index.html
    hot: true,
  }

  if (Boolean(open)) {
    config.open = open
  }

  return config
}