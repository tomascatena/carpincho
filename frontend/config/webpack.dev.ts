// import webpack, { Configuration } from 'webpack';
// import { merge } from 'webpack-merge';
// import commonConfig from './webpack.common';
// import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
// import path from 'path';

// const devConfig: Configuration = {
//   mode: 'development',
//   devtool: 'source-map',
//   devServer: {
//     port: 3000,
//     hot: true,
//     historyApiFallback: {
//       disableDotRule: true,
//     },
//     proxy: {
//       '/': 'http://localhost:5000/',
//     },
//     static: {
//       directory: path.resolve(__dirname, '../public'),
//       publicPath: '/',
//     },
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, '../public'),
//     publicPath: '/',
//   },
//   plugins: [new ReactRefreshPlugin()],
// };

// export default merge(commonConfig, devConfig);
