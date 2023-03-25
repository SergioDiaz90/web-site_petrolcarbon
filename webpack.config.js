const path = require('path');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const PugPlugin = require('pug-plugin');
const content = require('./src/content.json');

module.exports = {
    entry: './src/index.js',
    mode: "production",
    output: {
        filename: '[name][contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'src/[path]/[name][contenthash].[ext]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './src/assets/favicon.png',
            template: './src/views/index.pug',
            filename: 'index.html',
            minify: true
        }),
        new HtmlWebpackPugPlugin(),
        new MiniCssExtractPlugin(),
        new ImageMinimizerPlugin({
            minimizer: {
              // Los siguientes optimizadores se utilizan según el tipo de archivo
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ['gifsicle', { interlaced: true }],
                        ['mozjpeg', { quality: 30 }],
                        ['pngquant', { quality: [0.2, 0.2] }],
                        ['svgo', 
                            {
                                plugins: [{
                                    name: "preset-default",
                                    params: {
                                        overrides: {
                                            removeViewBox: false,
                                            addAttributesToSVGElement: {
                                                params: {
                                                    attributes: [
                                                        { xmlns: "http://www.w3.org/2000/svg" },
                                                    ],
                                                }
                                            }
                                        }
                                    }
                                }] }],
                    ]
                }
            },
        }),
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
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|ico|pdf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[path]/[name][contenthash][ext]'
                }
            },
            {
                // To use fonts on pug files:
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][contenthash][ext][query]'
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
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: true,
                },
            }),
        ],
    },
    stats: 'errors-only',
};