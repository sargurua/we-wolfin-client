import React, {Component} from 'react';
import {API_ROOT, HEADERS} from "../constants";
import Lobby from "../components/Lobby";
import Buttons from "../components/Buttons";
import Game from './Game';
import Error from '../components/Error'
import Results from '../components/Results'
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

class HomePage extends Component {
    state = {
        game: {},
        hidden: [],
        players: [],
        name: ""
    }

    setRoles = (game) => {
        fetch(`${API_ROOT}/roles`)
        .then(res => res.json())
        .then(json => {
            const newPlayers = []
            for(let i = 0; i < game.users.length; i++) {
                fetch(`${API_ROOT}/users/${i + 1}`, {
                    method: 'PATCH',
                    headers: HEADERS,
                    body: JSON.stringify({
                        role: json[i].id
                    })
                })
                .then(res => res.json())
                .then(data => newPlayers.push(data))
            }
        })
    }

    submitName = (name) => {
        this.setState({
            name
        })
    }

    render() {
        return (
            <div>
                <Router>
                    <Route exact path="/lobby">
                        <Lobby name={this.state.name} setRoles={this.setRoles} />
                    </Route>
                    <Route exact path="/">
                        <Buttons submitName={this.submitName} gameExists={this.state.gameExists}/>
                    </Route>
                    <Route exact path="/game">
                        <Game name={this.state.name}/>
                    </Route>
                    <Route exact path="/end">
                        <Results name={this.state.name}/>
                    </Route>
                    <Route exact path="/error">
                        <Error />
                    </Route>
                </Router>
            </div>
        )
    }
}

export default HomePage;