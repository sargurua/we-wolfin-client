import React, {Component} from 'react';
import {API_ROOT} from "../constants";

class GameBoard extends Component {
    renderPlayers = () => {
        return this.props.players.map(player => {
            return <p>{player.name}</p>
        })
    }

    render() {
        return (
            <div>
                <h2>Players:</h2>
                <div>{this.props.players ? this.renderPlayers() : null}</div>
                <h2>Hidden:</h2>
                <p>Hidden</p>
                <p>Hidden</p>
                <p>Hidden</p>
            </div>
        )
    }
}

export default GameBoard;