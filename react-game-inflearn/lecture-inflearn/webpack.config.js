const path = require('path'); //노드에서 경로를 쉽게 조작하도록함.

module.exports = {
    mode: 'development', //실서비스 : production
    devtool: 'eval',

    resolve: {
        extensions: ['.js', '.jsx']
    },
    //entry와 output이 가장 중요함
    entry: { //입력
        //client.jsx파일 안에서 WordRelay.jsx를 불러오기때문에 , WordRelay.jsx를 적어주지 않음.
        //확장자 안적어줘도됨. 위 extensions에있는 확장자를 기반으로 찾아줌.
        app: './client',
    },
    module: { // enrty에 있는 파일을 읽어서 모듈을 적용한 후 output으로 뺀다.
        rules: [{
            test: /\.jsx?$/, //js jsx파일에 룰을 적용하겠다.
            loader: 'babel-loader', //브라우저에 맞게 알아서 최신문법->옛날문법으로 바꿔줌
            option: { //babel의 옵션들을 넣어줌
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [],
            },
        }],
    },

    output: { //출력
        path: path.join(__dirname, 'dist'), //현재폴더 안에있는 dist폴더
        filename: 'app.js' //entry에 app[] 안에있는걸 다 함쳐서 app.js로 만들어준다!

    },
};