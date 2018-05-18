var path = require('path')
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var px2rem = require('postcss-px2rem');
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var glob = require('glob');
// var entries = utils.getJsEntry(['./src/pages/**/*.js']); // 获得入口js文件
var entries = utils.getJsEntry([`./src/pages/${process.env.NODE_PRODUCT}/**/*.js`]);
var HelloWorldPlugin = require('./plugins/HelloWorldPlugin');
var generateTpl = require('./create-page/generateTpl.js');

var env = process.env.NODE_PRODUCT

console.log(env)
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

const webpackConfig = {
    entry: entries,
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue',
            
            'src': path.resolve(__dirname, '../src'),
            'common': path.resolve(__dirname, '../src/common'),
            'components': path.resolve(__dirname, '../src/components'),
            'kld': path.resolve(__dirname, '../src/common/js'),
            'vux': path.resolve(__dirname, '../src/components/vux/src/components')
        }
    },
    resolveLoader: {
        fallback: [
            path.join(__dirname, '../node_modules'),
            path.join(__dirname, 'loaders')
        ]
    },
    module: {
        loaders: [

            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.js$/,
                loader: 'babel!customhtml-loader',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    // name: 'images/[name].[hash:7].[ext]'
                    name: utils.imageAssetsPath('images/[name].[hash:7].[ext]'),
                    publicPath: process.env.NODE_PLATFORM == 'app'  ? "" : '/'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: useCssSourceMap
        }),
        postcss: [
            require('autoprefixer')({
                browsers: ['last 2 versions']
            })
        ]
    },
    
    plugins: [

        new HelloWorldPlugin(),
        new webpack.DefinePlugin({

            'process.env': {

                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                NODE_PRODUCT: JSON.stringify(process.env.NODE_PRODUCT),
                localIp: JSON.stringify(utils.getLocalIp()),
                NODE_PLATFORM: JSON.stringify(process.env.NODE_PLATFORM)
            }
        })
    ]
}

module.exports = webpackConfig;

var dir = utils.getHtmlEntry([`./src/pages/${process.env.NODE_PRODUCT}`]);

var demoIntro = (env === 'static' || env === 'staticbuild' )  ? generateTpl.demoIntro: '';

var allTpls = utils.getTpls();

dir.forEach((pathname, index) => {

    // var pagename = `pages/${pathname}`;
    var pagename = `pages/${pathname}`;
    
    var conf = {
        filename: `${pagename}.html`,
        pageNav:utils.getPageNav(pathname),
        pageTabBar: utils.getPageTabBar(pathname),
        demoIntro,
        template: allTpls[pathname],
        inject: true,
        chunksSortMode: 'dependency',
    }

    if (pagename in module.exports.entry) {
        conf.chunks = ['manifest', 'vendor', pagename];
        conf.hash = true;
    }

    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
})