import React, {Component} from 'react';
import {API_ROOT} from "../constants";

class GameBoard extends Component {
    renderPlayers = () => {
        return this.props.players.map(player => {
            return (
                <div className="board-player-item">
                    <img src="http://www.samacharnama.com/wp-content/uploads/2018/03/1-360.jpg" />
                    <p>{player.name}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="board-page">
                <div className="board-header">
                    <h2>Current Turn: {this.props.turn}</h2>
                    <h3>Time Remaining: {this.props.timer} seconds</h3>
                </div>
                <div className="board-body">
                    <div className="board-players">
                        <h2>Players:</h2>
                        <div>{this.props.players ? this.renderPlayers() : null}</div>
                    </div>
                    <div className="board-hidden">
                        <h2>Hidden:</h2>
                        <p>Hidden</p>
                        <p>Hidden</p>
                        <p>Hidden</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameBoard;