import React, {Component} from 'react';
import {API_ROOT, HEADERS } from "../constants";
import GameBoard from '../components/GameBoard';
import TurnContainer from './TurnContainer';
import {withRouter} from 'react-router-dom'

class Game extends Component {
    state = {
        role: {name: ""},
        currentRole: {name: ""},
        game: {},
        players: [],
        roles: [],
        hidden: [],
        turnIndex: 0,
        turn: "",
        turnOrder: ["Werewolf", "Minion", "Seer", "Robber", "Troublemaker", "Insomniac", "DayTime"],
        // turnOrder: ["Werewolf", "DayTime"],
        time: 30
    }

    intervalId1 = 0
    intervalId2 = 0

    componentDidMount(){
        if (this.props.name !== ""){
            fetch(`${API_ROOT}/games/1`)
            .then(resp => resp.json())
            .then(game => {
                const user = game.users.find((user) => {
                    return user.name === this.props.name
                })

                if(user.role === null){
                    user.role = {name: ""}
                }
                this.setState({
                    currentRole: {name: ""},
                    role: user.role,
                    players: game.users,
                    turn: game.turn,
                    game: game,
                    roles: game.roles,
                    time: this.state.time - 1
                })
            })
            this.intervalId1 = setInterval(this.setGame, 1000)
            this.intervalId2 = setInterval(this.changeTurn, 30000)
        }
        else {
            this.props.history.push("/error")
        }
    }

    changeTurn = () => {
        fetch(`${API_ROOT}games/changeTurn`, {
            method: 'PATCH',
            headers: HEADERS,
            body: JSON.stringify({
                newTurn: this.state.turnOrder[this.state.turnIndex + 1]
            })
        })
        .then(resp => resp.json())
        .then(game => {
            console.log(game)
            this.setState({
                turn: game.turn,
                turnIndex: this.state.turnIndex + 1,
                time: 30
            })
        })
    }

    setGame = () => {
        fetch(`${API_ROOT}/games/1`)
        .then(resp => resp.json())
        .then(game => {
            const user = game.users.find((user) => {
                return user.name === this.props.name
            })

            let newRole = {}

            if(user.role === null){
                user.role = {name: ""}
            }

            if(this.state.role.name === ""){
                newRole = user.role
            }
            else {
                newRole = this.state.role
            }
            game.users.sort((a, b) => a.id - b.id)
            this.setState({
                role: newRole,
                currentRole: user.role,
                players: game.users,
                turn: game.turn,
                game: game,
                roles: game.roles,
                time: this.state.time - 1
            })
        })
    }

    componentWillUnmount() {
        clearInterval(this.intervalId1)
        clearInterval(this.intervalId2)
    }

    setGameState = game => {
        fetch(`${API_ROOT}/roles`)
        .then(resp => resp.json())
        .then(json =>{ 
            console.log(game)
            this.setState({
                game,
                roles: json,
                players: game.users
            })
        })
    }
    
    render() {
        // console.log("Whyyyyyyyyyyyyyyyy", this.state.currentRole, this.state.currentRole.name)
        return (
            <div>
                <p>Your First Role for Testing: {this.state.role !== null ? this.state.role.name : null}</p>
                <p>Your Current Role for Testing: {this.state.currentRole !== null ? this.state.currentRole.name : null}</p>
            {                  
                this.state.turn !== this.state.role.name
                ?  
                    <GameBoard name={this.props.name} intervalId2={this.intervalId2} intervalId1={this.intervalId1} roles={this.state.roles} turn={this.state.game.turn} timer={this.state.time} players={this.state.players} />
                : 
                    <TurnContainer name={this.props.name} role={this.state.role} turn={this.state.game.turn} game={this.state.game}/>
            }
            </div>
        )
    }
}

export default withRouter(Game);