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
}

export default (env: EnvVariables) => {
  const config = buildWebpack({
    port: env?.port ?? 6001,
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
    name: 'shop',
    filename: 'remoteEntry.js',
    exposes: {
      // './App': path.resolve(paths.src, 'components', 'App.tsx'),
      './Router': './src/router/Router.tsx',
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
