import React, {Component} from 'react';
import {API_ROOT} from "../constants";
import Daytime from "./Daytime"

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

    renderNight = () => {
        return (
            <div className="board-page">
                <div className="board-header">
                    <h2>Current Turn: {this.props.turn}</h2>
                    <h3>Time Remaining: {this.props.timer} seconds</h3>
                </div>
                <div className="board-body">
                    <div className="board-players">
                        <h2>Players:</h2>
                        <div className="bplist">{this.props.players ? this.renderPlayers() : null}</div>
                    </div>
                    <div className="board-hidden">
                        <h2>Hidden:</h2>
                        <div className="hidden-list">
                            <div className="hidden-list-item">
                                <img src="https://carboncostume.com/wordpress/wp-content/uploads/2013/04/mac.jpg" />
                            </div>
                            <div className="hidden-list-item">
                                <img src="https://carboncostume.com/wordpress/wp-content/uploads/2013/04/mac.jpg" />
                            </div>
                            <div className="hidden-list-item">
                                <img src="https://carboncostume.com/wordpress/wp-content/uploads/2013/04/mac.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderDayTime = () => {
        clearInterval(this.props.intervalId1)
        clearInterval(this.props.intervalId2)
        return <Daytime name={this.props.name}/>
    }

    render() {
        return (
            <div>
                {this.props.turn === "DayTime"
                ?
                this.renderDayTime()
                :
                this.renderNight()
                }
            </div>
            
        )
    }
}

export default GameBoard;