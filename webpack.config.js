const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const idProd = !isDev;

const PATHS = {
  // Path to main app dir
  src: path.join(__dirname, 'src'),
  // Path to Output dir
  dist: path.join(__dirname, 'dist'),
  // Path to Second Output dir (js/css/fonts etc folder)
  assets: 'assets/',
};

const PATHSPAGE = {
  // Path to main app dir
  src: path.join(__dirname, 'src/pages'),
  // Path to Output dir
  dist: path.join(__dirname, 'dist/pages'),
  // Path to Second Output dir (js/css/fonts etc folder)
  assets: 'assets/',
};

const PAGES_DIR = PATHS.src;
const PAGES = fs
  .readdirSync('./src/pages')
  .filter((fileName) => fileName.endsWith('.pug'));
// const PAGES_DIR = `${PATHS.src}/pug/pages/`;
// const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

let p = {};
PAGES.forEach((page) => {
  const name = page.replace(' ', '');
  console.log({ [name]: `./js/pages/${name}.js` });
  p = { [name]: `./js/pages/${name}.js`, ...p };
});
console.log(PAGES);
const fileName = (ext) => (isDev ? `[name].${ext}` : `[name].${ext}`);
const optimization = () => {
  const confObj = {
    splitChunks: { chunks: 'all' },
  };

  if (idProd)
    confObj.minimizer = [
      new OptimizCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
      // new ImageMinimizerPlugin({
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.imageminMinify,
      //     options: {
      //       // Lossless optimization with custom option
      //       // Feel free to experiment with options for better result for you
      //       plugins: [
      //         ['gifsicle', { interlaced: true }],
      //         ['jpegtran', { progressive: true }],
      //         ['optipng', { optimizationLevel: 5 }],
      //         // Svgo configuration here https://github.com/svg/svgo#configuration
      //         // [
      //         //   'svgo',
      //         //   {
      //         //     plugins: extendDefaultPlugins([
      //         //       {
      //         //         name: 'removeViewBox',
      //         //         active: false,
      //         //       },
      //         //       {
      //         //         name: 'addAttributesToSVGElement',
      //         //         params: {
      //         //           attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
      //         //         },
      //         //       },
      //         //     ]),
      //         //   },
      //         // ],
      //       ],
      //     },
      //   },
      // }),
    ];

  return confObj;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './js/main.js',
    // index: "./js/pages/index.js",
    // ...p,
  },
  output: {
    filename: `./js/${fileName('js')}`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    assetModuleFilename: 'src/assets/images/[name][ext]',
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3004,
  },
  optimization: optimization(),
  plugins: [
    // new HTMLWebpackPlugin({
    //   filename: "index.pug",
    //   template: path.resolve(__dirname, "src/index.pug"),
    //   minify: { collapseWhitespace: false },
    //   chunks: ["main", "index"],
    // }),
    new SVGSpritemapPlugin('./src/assets/icons/**/*.svg', {
      output: {
        filename: './svg/sprite.svg',
        svg4everybody: true,
        // svgo: true,
      },
      sprite: {
        prefix: false,
        generate: {
          use: true,
          symbol: true,
          // view: true,
          //   title: false,
        },
      },
      styles: `src/scss/sprite.scss`,
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.pug'),
      minify: { collapseWhitespace: false },
      chunks: ['main', 'index'],
    }),
    // new HTMLWebpackPlugin({
    //   filename: "index2.html",
    //   template: path.resolve(__dirname, "src/index2.pug"),
    //   minify: { collapseWhitespace: false },
    //   chunks: ["main", "index2"],
    // }),
    ...PAGES.map((page) => {
      console.log(page);
      return new HTMLWebpackPlugin({
        template: path.resolve(__dirname, `src/pages/${page}`),
        filename: page.replace('.pug', '.html'),
        minify: { collapseWhitespace: false },
        chunks: ['main', page.replace('.pug', '')],
      });
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/${fileName('css')}`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],
  devtool: idProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
          },
        ],
      },
      // {
      //   test: /\.pug$/i,
      //   loader: "html-loader",
      //   options: {
      //     minimize: false,
      //   },
      // },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // hmr: isDev,
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader',

          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(?:|gif|jpg|jpeg|svg|png|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]',
        },
      },
    ],
  },
};
