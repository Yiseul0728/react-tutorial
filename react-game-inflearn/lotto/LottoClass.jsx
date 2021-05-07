import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) { // 1~45를 랜덤하게 섞기
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1]; // shuffle의 마지막 수 -> 보너스 숫자
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c); // shuffle의 0~6번째 수를 오름차순 정렬
    return [...winNumbers, bonusNumber];
}


class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), //당첨숫자(보너스포함)
        winBalls: [], //당첨숫자
        bonus: null, //보너스
        redo: false, //재실행
    };

    timeouts = [];

    runTimeouts = () => {
        console.log('runTimeouts');
        const { winNumbers } = this.state;
        for (let i = 0; i < winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 7000);
    };

    componentDidMount() {
        console.log('didMount');
        this.runTimeouts();
        console.log('로또 숫자를 생성합니다.');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('DidUpdate');
        if (this.state.winBalls.length === 0) {
            this.runTimeouts();
        }
        if (prevState.winNumbers !== this.state.winNumbers) {
            console.log('로또 숫자를 생성합니다.');
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        });
        this.timouts = [];
    };

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        );
    }
}

export default Lotto;