const path = require('path');
const json5 = require('json5');

module.exports = {
    entry: './src/js/server.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'src/sever/[path]/[name].[ext]'
    },
    module:{
        rules: [
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
    },
    stats: 'errors-only',
};