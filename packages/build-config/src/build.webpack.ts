import webpack from "webpack";
import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {buildDevServer} from "./build.dev-server";
import {buildLoaders} from "./build.loaders";
import {buildPlugins} from "./build.plugins";
import {buildResolvers} from "./build.resolvers";
import {BuildOptions} from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration & DevServerConfiguration {
  const {mode, paths} = options
  const isDev = mode === 'development'

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined
  }
}