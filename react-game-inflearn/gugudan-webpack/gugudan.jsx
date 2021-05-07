const React = require('react'); //node.js의 모듈시스템을사용.
const { useState, useRef } = React;

//state가 바뀌면 함수가 통째로 다시실행되기때문에 class형보다 느릴수있다
//class형은 state가 바뀔때 render()만 다시실행됨
const GuGuDan = () => {
    //state를 객체로 묶지않고 하나씩 분리해줌
    //React.useState()에 초기값 설정
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const InputRef = useRef(null); //ussRef 를 이용해 DOM에 접근 & current 

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
            setResult('정답: ' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            InputRef.current.focus();

        } else {
            setResult('땡')
            setValue('');
            InputRef.current.focus();
        }
    }

    // const onRefInput = (c) => { this.input = c; };
    const onChangeInput = (e) => {
        setValue(e.target.value); //class컴포넌트에서 this.setState였음
    };

    return (
        <>
            <div> {first} 곱하기 {second}는? </div>
            <form onSubmit={onSubmitForm}>
                <input ref={InputRef} onChange={onChangeInput} value={value} />
                <button>입력</button>
            </form>
            <div id="result"> {result} </div>
        </>
    );
}

module.exports = GuGuDan;