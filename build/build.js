require('shelljs/global')

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = config.build.assetsRoot;
var staticPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);

rm('-rf', assetsPath)
mkdir('-p', staticPath);
cp('-R', 'static/*', staticPath)
cp('-R', 'images/*', staticPath + '/images')


webpack(webpackConfig, function (err, stats) {

  cp('-R', path.join(assetsPath, process.env.NODE_PRODUCT,'static/images'), path.join(assetsPath,'static'))
  rm('-rf', path.join(assetsPath, process.env.NODE_PRODUCT));
  // rm('-rf', path.join(assetsPath));

  spinner.stop()

  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
