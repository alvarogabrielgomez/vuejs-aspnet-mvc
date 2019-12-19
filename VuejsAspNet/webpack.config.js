const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';

var appBasePath = './Scripts/app/';
var appBasePathCss = './Styles/app/';

var jsEntries = {};
var cssEntries = {};
// We search for index.js files inside basePath folder and make those as entries

fs.readdirSync(appBasePath).forEach(function (name) {
    var indexFile = appBasePath + name + '/index.js';
    if (fs.existsSync(indexFile)) {
        jsEntries[name] = indexFile;
    }
});

fs.readdirSync(appBasePathCss).forEach(function (name) {
    var indexFile = appBasePathCss + name + '/app.scss';
    if (fs.existsSync(indexFile)) {
        cssEntries[name] = indexFile;
    }
});

module.exports = {
    mode: 'development',
    //entry: jsEntries,
    entry: {
        main: ['./Scripts/app/app.js', './Styles/app/app.scss']
    },
    output: {
        //path: path.resolve(__dirname, './Scripts/bundle/'),
        publicPath: '/bundle/',
        chunkFilename: 'app.[chunkhash].js',
        path: path.resolve(__dirname, './bundle/'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        alias: {
            'vue$': isDevelopment ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.min.js',
            '@': path.join(__dirname, appBasePath)
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }

            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                        }
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },



        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'app.css',
            path: path.resolve(__dirname, './Styles/bundle/')
        }),
    ],

    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    extractComments: isDevelopment? true: false,
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    }
};