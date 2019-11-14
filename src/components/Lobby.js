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
        if(this.props.name !== ""){
            this.intervalID = setInterval(this.fetchGame, 1000)
        }
        else {
            this.props.history.push("/error")
        }       
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
            if(game.users !== undefined){
                const newStart = game.users.length === game.num_players
                this.setState({
                    players: game.users,
                    start: newStart,
                    started: game.started,
                    game
                })
            }
        })
    }

    renderPlayers = (players) => {
        if(players !== []){
            return players.map(player => {
                return (
                    <div className="lobby-player-card">
                        <h4>{player.name}</h4>
                        <img src="https://res.cloudinary.com/teepublic/image/private/s--vSStJZf4--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_191919,e_outline:48/co_191919,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1516385768/production/designs/2292106_0.jpg" />
                    </div>
                )
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
            <div className="lobby-page">
                <div className="lobby-header">
                    <h2>Welcome to the lobby</h2>
                    <h3>({this.state.players.length} / {this.state.game.num_players}) players have joined</h3>
                </div>
                {this.state.start
                ?
                    <button className="lobby-btn" onClick={this.handleClick}>Start</button>
                :
                    null
                }
                <div className="lobby-player-list">
                    { this.renderPlayers(this.state.players) }
                </div>
            </div> 
        )   
    }
}

export default withRouter(Lobby)