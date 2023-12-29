import {ModuleOptions} from 'webpack'
import ReactRefreshTypeScript from 'react-refresh-typescript';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {buildBabelLoader} from "./babel/build-babel.loader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development'

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
          },
        },
      },
      "sass-loader",
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: isDev
        }
      }
    ],
  };

  const babelLoader = buildBabelLoader(options)

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgLoader = [
    {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: /url/,
      use: ['@svgr/webpack'],
    },
    {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: {not: [/url/]}, // exclude react component if *.svg?url
      use: [{
        loader: '@svgr/webpack', options: {
          icon: true,
          svgoConfig: {
            plugins: [{
              name: 'convertColors',
              params: {currentColor: true}
            }]
          }
        }
      }],
    }
  ];

  return [
    assetLoader,
    ...svgLoader,
    scssLoader,
    tsLoader,
    // babelLoader,
  ]
}