const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENTRY_DIR = 'src';
const ENTRY_FILE = 'index';
const ENTRY_EXT = 'js';

const HTML_TEMPLATE_PATH = 'src/template.html';
const HTML_OUTPUT_FILE = 'index.html';
const BUILD_DIRECTORY = 'build';

module.exports = {
    module: {
        rules: [
            {
                test: /.(js|cjs|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    entry: {
        [ENTRY_FILE]: path.resolve(__dirname, ENTRY_DIR, ENTRY_FILE + '.' + ENTRY_EXT)
    },
    devServer: {
        magicHtml: true,
        historyApiFallback: true,
        open: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: HTML_OUTPUT_FILE,
            template: HTML_TEMPLATE_PATH,
            inject: true
        })
    ],
    output: {
        path: path.resolve(__dirname, BUILD_DIRECTORY)
    }
}

exports = module.exports;
