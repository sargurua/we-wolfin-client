import React, { Component } from 'react';
import {API_ROOT, HEADERS} from '../constants'

class Troublemaker extends Component {
    state = {
        troubled: false,
        selected_id_1: 0, 
        selected_id_2: 0,
    }

    renderPlayers = () => {
        const mapPlayers = this.props.game.users.map(player => {
            if (player.name !== this.props.name){
                return (
                    <option value={player.id}>{player.name}</option>
                )
            }
        })

        return (
            <div>
                <h3>Who you troublin'?</h3>
                <form className="trouble-form" onSubmit={this.handleSubmit}>
                    <p>Player 1</p>
                    <select>
                        {mapPlayers}
                    </select>
                    <p>Player 2</p>
                    <select>
                        {mapPlayers}
                    </select>
                    <div>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        )
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log("Event targets", e.target[0].value, e.target[1].value)
        const selected1 = this.props.game.users.find(user => {
            return user.id == e.target[0].value
        })
        const selected2 = this.props.game.users.find(user => {
            return user.id == e.target[1].value
        })
        console.log("Selected user id", selected1)
        console.log("Current user id", selected2)
        fetch(`${API_ROOT}/games/trouble`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify({
                first_id: selected1.id,
                second_id: selected2.id
            })
        })
        .then(resp => console.log(resp))
        this.setState({
            selected_id_1: selected1.id,
            selected_id_2: selected2.id,
            troubled: true
        })
    }

    render() {
        return (
            <div>
                <h2>You are a Troublemaker</h2>
                <h3>At night, the Troublemaker may switch the cards of two other players without looking at those The players who receive 1 a different card are now the role (and team) of their new card, even though they don't know what role that is until the end of the game. The Troublemaker is on the village team.</h3>
                <img className="avatar" src="https://i.pinimg.com/236x/1c/f9/02/1cf9021785ffbe933a2da4459e85c74a--one-night-werewolf.jpg" />
                <div className="action">
                    { this.renderPlayers() }
                </div>
            </div>
        )
    }
}

export default Troublemaker;