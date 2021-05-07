const path = require('path');
const { webpack } = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval', //개발시는 eval, production일때는 hidden-souce-map
    resolve: {
        extensions: ['.jsx', '.js'],
    },

    //** entry에있는 파일에 module, plugins적용해서 output으로 나온다.(흐름 이해)
    entry: {
        app: './client',
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {//babel options
                presets: [//plugin들의 모음
                    ['@babel/preset-env', { // 배열로묶어 상세설정을 할 수도 있다.
                        targets: {
                            browsers: ['>5% KR'],
                            //한국에서 점유율이 5%이상되는 브라우저에서 지원. 등.. 
                            //https://github.com/browserslist/browserslist 에서 다양한 옵션 확인가능함
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'],
                plugins: [],
            },
        }],
    },

    plugins: [//확장프로그램의 느낌
        new webpack.LoaderOptionsPlugin({ debug: true }), //맨위에서 webpack불러와서 사용가능.
    ],

    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
    },

    //** entry에있는 파일에 module, plugin적용해서 output으로 나온다.(흐름 이해)
};