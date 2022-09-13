const path = require('path');
const json5 = require('json5');
const PugPlugin = require('pug-plugin');
const content = require('./src/content.json');

module.exports = {
    entry: {
        // using pug-plugin the entry-point is Pug template
        // all script and styes sources must be used directly in Pug
        index: './src/views/index.pug', // => index.html
    },
    resolve: {
        // use aliases in PUG, JS, SCSS instead of relative paths
        alias: {
            Src: path.join(__dirname, 'src/'),
            Views: path.join(__dirname, 'src/views/'),
            Images: path.join(__dirname, 'src/assets/images/'),
            Fonts: path.join(__dirname, 'src/assets/fonts/'),
            Styles: path.join(__dirname, 'src/styles/'),
            Scripts: path.join(__dirname, 'src/scripts/'),
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].[contenthash:8].js', // use hashed filename for JS
    },
    plugins: [
        // enable processing of Pug files defined in entry
        new PugPlugin({
            pretty: true, // formatting HTML, use it only for development (works same as `minify:false` by HtmlWebpackPlugin)
            // extract CSS to separate file
            extractCss: {
              // output filename of styles
              filename: 'assets/css/[name].[contenthash:8].css',
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
                options: {
                    data: content.menu
                }
            },
            {
                test:/\.(css|sass|scss)$/i,
                // don't use style-loader, all CSS should be loaded as file
                use: ['css-loader', 'postcss-loader', 'sass-loader']
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
            directory: path.join(__dirname, 'dist'), // must be same as output.path
        },
        open: true, // use this option here, not in package.json by scripts
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