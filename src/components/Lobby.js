import React, {Component} from 'react';
import {API_ROOT} from "../constants"
import { HEADERS } from '../constants';
import {withRouter} from "react-router-dom";


class Lobby extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players: [],
            start: false,
            started: false,
            game: {},
        }
    }

    intervalID = 0;
    
    componentDidMount() {
        this.intervalID = setInterval(this.fetchGame, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }
    
    handleClick = () => {
        fetch(`${API_ROOT}/games/1`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify({
                started: true
            })
        })
        this.props.setRoles(this.state.game);
    }

    fetchGame = () => {
        fetch(`${API_ROOT}/games/1`)
        .then(res => res.json())
        .then(game => {
            console.log(game)
            const newStart = game.users.length === game.num_players
            this.setState({
                players: game.users,
                start: newStart,
                started: game.started,
                game
            })
        })
    }

    renderPlayers = (players) => {
        if(players !== []){
            return players.map(player => {
                return <p key={player.id}>{ player.name }</p>
            })
        }
    }
    
    handleReceived = response => {
        console.log(response.user)
        this.setState((prevState) => {
            return {players: [...prevState.players, response.user]}
        })
    }


    gameHasStarted = () => {
        this.props.history.push('/game')
    }

    render() {
        if (this.state.started){
            this.gameHasStarted()
        }
        return (
            <div>
                <h2>Lobby ({this.state.players.length} / {this.state.game.num_players})</h2>
                {/* <ActionCableConsumer
                    channel={{ channel: 'UsersChannel' }}
                    onReceived={this.handleReceived}
                /> */}
                { this.renderPlayers(this.state.players) }
                {this.state.start
                ?
                    <button onClick={this.handleClick}>Start</button>
                :
                    null
                }
            </div> 
        )   
    }
}

export default withRouter(Lobby)