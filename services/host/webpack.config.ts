import path from "path";
import {BuildMode, BuildPlatform, buildWebpack} from "@packages/build-config";
import webpack from "webpack";
import packageJson from './package.json'

type EnvVariables = {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  open?: string;
  platform: BuildPlatform
  SHOP_REMOTE_URL?: string
  ADMIN_REMOTE_URL?: string
}

export default (env: EnvVariables) => {
  const SHOP_REMOTE_URL = env?.SHOP_REMOTE_URL ?? 'http://localhost:6001'
  const ADMIN_REMOTE_URL = env?.SHOP_REMOTE_URL ?? 'http://localhost:6002'

  const config = buildWebpack({
    port: env?.port ?? 6000,
    mode: env.mode ?? 'development',
    platform: env?.platform ?? 'desktop',
    analyzer: env?.analyzer,
    open: env?.open ?? '/',
    paths: {
      entry: path.resolve(__dirname, "src", "index.tsx"),
      html: path.resolve(__dirname, "public", "index.html"),
      output: path.resolve(__dirname, "build"),
      src: path.resolve(__dirname, "src"),
      public: path.resolve(__dirname, "public"),
    }
  });

  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: 'host',
    filename: 'remoteEntry.js',
    remotes: {
      shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
      admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
    },
    shared: {
      ...packageJson.dependencies,
      react: {
        eager: true,
        requiredVersion: packageJson.dependencies['react']
      },
      'react-router-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-router-dom']
      },
      'react-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-dom']
      }
    }
  }))

  return config;
};
