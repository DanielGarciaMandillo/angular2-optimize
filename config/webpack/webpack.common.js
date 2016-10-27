let env = require('dotenv').config({
    silent: true
});
let webpack = require('webpack');
let path = require('path');
let _ = require('lodash');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let helpers = require('./helpers');
let letants = require('./constants');

let isProd = process.env.npm_lifecycle_event === 'build';
let envMap = _.mapValues(env, v => JSON.stringify(v));

module.exports = {
    entry: {
        'polyfills': './src/app/polyfills.ts',
        'vendor': './src/app/vendor.ts',
        'app': './src/app/main.ts'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [{
            enforce: 'pre',
            test: /^((?!(ngfactory|shim)).)*ts$/,
            loader: 'tslint'
        }, {
            test: /\.ts$/,
            loaders: [
                'awesome-typescript-loader',
                'angular2-template-loader',
                'angular2-router-loader?loader=system&genDir=src/compiled/src/app&aot=' + isProd
            ]
        }, {
            test: /\.html$/,
            loader: 'html',
            exclude: helpers.root('src', 'public')
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file?name=assets/[name].[hash].[ext]'
        }, {
            test: /\.css$/,
            exclude: helpers.root('src', 'app'),
            loader: ExtractTextPlugin
                .extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader" + (isProd ? '?minimize' : '')
                })
        }, {
            test: /\.css$/,
            include: helpers.root('src', 'app'),
            loader: 'raw'
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': envMap
        }),

        new webpack.ContextReplacementPlugin(
            letants.CONTEXT_REPLACE_REGEX,
            helpers.root('./src') // location of your src
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            favicon: 'src/favicon.ico',
            template: 'src/public/index.html'
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitError: true,
                    failOnHint: true
                }
            }
        })
    ]

};
