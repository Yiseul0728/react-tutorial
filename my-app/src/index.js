import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 클래스형
// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square"
//                 onClick={() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

//함수형
function Square(props) {
    return ( //click시 Board에서 받아온 props 값(o.x)을 네모 안에 표시
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    // constructor(props) { //컴포넌트 생성자에서 super를 호줄하기 전에는 this를 사용할 수 없음
    //     super(props);
    //     this.state = { //Board생성자의 초기state
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     };
    // }

    //** Game 컴포넌트(상위)로 이동 및 수정(history연결)
    // handleClick(i) {
    //     const squares = this.state.squares.slice(); //셋팅된 squares배열 복사
    //     if (calculateWinner(squares) || squares[i]) { //승리하거나 이미채워진 칸은 클릭무시
    //         return;
    //     }
    //     squares[i] = this.state.xIsNext ? 'X' : 'O'; //삼항연산으로 O.X표시 바꿔표시
    //     this.setState({
    //         squares: squares, //복사된 squares배열로 다시 셋팅
    //         xIsNext: !this.state.xIsNext //O.X 순서 바꿔주기
    //     });
    // }

    renderSquare(i) {
        return (
            <Square //위에서 정의한 Square 컴포넌트. => 아래 값들이 하위컴포넌트인 square에 props로 전달됨

                //**Board 컴포넌트에서 Game 컴포넌트로 state를 끌어올림
                //**Game컴포넌트(상위)에서 값을 받아오도록 props로 변경함 
                // value={this.state.squares[i]}
                value={this.props.squares[i]}
                //onClick={() => this.handleClick(i)}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        //**Board 컴포넌트에서 Game 컴포넌트로 state를 끌어올림
        //**Game컴포넌트(상위)에서 게임의 상태를 렌더링하기때문에 중복코드 제거
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = 'Winner ' + winner;
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //생성자의 초기 state설정
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        // const history = this.state.history; //초기값 - 위에서 설정한 squares가 있는 9개의 null 배열
        const history = this.state.history.slice(0, this.state.stepNumber + 1); //되돌리기시 history변경되도록 수정
        const current = history[history.length - 1]; //history[8]
        const squares = current.squares.slice(); //아래 setState에서 null -> O.X로 셋팅됌
        if (calculateWinner(squares) || squares[i]) { //승리하거나 이미채워진 칸은 클릭무시
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //삼항연산으로 O.X순서 바꿔표시
        this.setState({
            history: history.concat([{ //기존 history에 squares(배열)을 합쳐서 새로운 history(배열)로 셋팅
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({ //사용자에게 표시되는 이동을 반영함
            stepNumber: step,
            xIsNext: (step % 2) === 0, //step이 짝수있때마다 true
        });
    }

    render() {
        const history = this.state.history;
        // const current = history[history.length - 1];
        const current = history[this.state.stepNumber]; //현재 step에맞는 이동을 나타내줌
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => { //map으로 데이터를 묶음
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (  //배열의 자식들은 고유의 key를 갖고있어야함
                <li key={move}>
                    {/* 돌아가기버튼 */}
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        });

        let status;

        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [ //우승 경우의수(빙고)
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

