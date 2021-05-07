const path = require('path');
const RefreshWebpckPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.jsx', '.js'],
    },

    entry: {
        app: './client',
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: { browsers: ['last 2 chrome versions'] },
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: [ //바벨로더의 plugin
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel' //핫리로딩 사용하기위한 추가 플러그인
                ],
            },
        }],
    },
    plugins: [
        new RefreshWebpckPlugin()
    ],

    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'), //실제경로
        publicPath: '/dist/', //가상경로라고 생각하면됨
    },
    devServer: {
        publicPath: '/dist/',
        hot: true,
    },
};