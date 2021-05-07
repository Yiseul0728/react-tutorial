const React = require('react');
const { Component } = React;
//npm에서 react를 불러옴

class WordRelay extends Component { //extends React.Component인데 위에서 const { Component } = React; 를 써줘서 Component라고 써줘도됌
    state = {

    };

    render() {
    }
}


module.exports = WordRelay;
//쪼갠파일에서 쓰는 컴포넌트를 밖에서도 사용할 수 있게해준다.

//파일(컴포넌트)을 쪼개는경우 맨위, 맨아래 코드를 추가로 적어줘야한다.