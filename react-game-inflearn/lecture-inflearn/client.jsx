const React = require('react');
const ReactDom = require('react-dom');
//npm에 설치했던것을 불러옴

const WordRelay = require('./WordRelay'); //컴포넌트 상대경로로 불러옴

ReactDom.render(<WordRelay />, document.querySelector('#root'));


//안에 jsx문법을 쓰면 jsx확장자를쓴다.
//이파일은 안에 jsx문법을 담고있구나. react전용 파일이겠구나 를 알수있다.