import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {
    getEntries
} from './utils';

const context = path.resolve(__dirname, '../'); // /assets
const moduleIdPlugin = webpack.HashedModuleIdsPlugin;

const extractTextHash = ''; //-[contenthash:5]
const fileNameHash = ''; //-[chunkhash:5]

const extractSass = new ExtractTextPlugin(`[name]/bundle${extractTextHash}.css`);


let config = {
    context,
    entry: getEntries(path.resolve(context, "./src/")),
    output: {
        path: path.resolve(context, "./dist/"),
        filename: `[name]/bundle${fileNameHash}.js`
    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif)$/i,
            loader: "url-loader?name=[path][name].[ext]&limit=3000&fallback="+path.resolve(context, "./build/img-loader")
        }, {
            test: /favicon\.ico$/i,
            loader: "file-loader?name=[name].[ext]"
        }, {
            test: /\.(ttf|eot|svg|woff)(\?[a-z0-9]+)?$/i,
            loader: "file-loader?name=[path][name].[ext]"
        }, {
            test: /\.css$/i,
            loader: extractSass.extract(['css-loader?minimize=true'])
        }, {
            test: /\.scss$/i,
            loader: extractSass.extract(['css-loader?minimize=true', 'sass-loader'])
        }, {
            test: /\.js$/i,
            use: [{
                loader: 'es3ify-loader'
            }, {
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                }
            }],
            exclude: /node_modules/i

        }, {
            test: /\.html$/i,
            loader: "html-loader?minimize=false"
        }, {
            test: /\.js$/i,
            enforce: 'post',
            loader: 'es3ify-loader'
        }]
    },
    resolve: {
        modules: [path.resolve(context, '../node_modules')]
    },
    plugins: [
        extractSass,
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': process.env.NODE_ENV || 'production'
        }),
        new moduleIdPlugin()
    ]
};

module.exports = config;