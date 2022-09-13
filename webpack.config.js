const path = require('path');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const PugPlugin = require('pug-plugin');
const content = require('./src/content.json');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/views/index.pug',
            filename: 'index.html',
            minify: false
        }),
        new HtmlWebpackPugPlugin()
    ],
    module:{
        rules: [
            {
                test: /\.m?.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.pug$/,
                loader: PugPlugin.loader,
                options:{
                    data: content.menu
                }
            },
            {
                test:/\.(css|sass|scss)$/i,
                use: ['style-loader','css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name].[hash:8][ext]'
                }
            },
            {
                // To use fonts on pug files:
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext][query]'
                }
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    parse: json5.parse,
                },
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'src/views/**/*.*'),
        },
        compress: true,
        watchFiles: {
            paths: ['src/**/*.*', 'assets/scss/**/*.*'],
            options: {
                usePolling: true
            }
        }
    },
    stats: 'errors-only'
};