// entry -> output
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('styles.css');
module.exports = (env) => {
const isProduction = env ===  'production';

return {
    entry: './src/app.js',
    //entry: './src/playground/hoc.js',
    output: {
        path:  path.join(__dirname ,'public'),
        filename: 'bundle.js'
    }, 
    module : {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/, 
                exclude: /node_modules/
            }, 
            {
                test: /\.s?css$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [ 
                        {
                            loader : 'css-loader' ,
                            options: {
                                sourceMap: true
                            }
                        }, 
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                          
                    ]
                })               
            }
        ]
    }, 
    plugins: [
        extractCSS
    ],
    mode: env ? env : 'development',
    devtool: isProduction ? 'source-map' :  'inline-source-map',
    devServer:  {
        contentBase: path.join(__dirname ,'public'),
        historyApiFallback: true
    },
    performance: {
        hints: false
    }
};
}

// loaders.
