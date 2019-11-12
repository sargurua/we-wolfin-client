import React, { Component } from 'react';
import {HEADERS, API_ROOT} from '../constants'

class Robber extends Component {
    state = {
        robbed: false,
        selected_id: 0, 
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
                <h3>Who you robbin'?</h3>
                <form className="robber-form" onSubmit={this.handleSubmit}>
                    <select>
                        {mapPlayers}
                    </select>
                    <input type="submit"/>
                </form>
            </div>
        )
    }

    renderFinished = () => {
        const user = this.props.game.users.find(user => {
           return user.name === this.props.name
        })

        const selected = this.props.game.users.find(user => {
           return user.id === this.state.selected_id
        })

        return (
            <div>
                <p>You have robbed {selected.name} and are now the {user.role.name}</p>
            </div>
        )
    }

    handleSubmit = e => {
        e.preventDefault()
        const user = this.props.game.users.find(user => {
            return user.name === this.props.name
        })
        const selected = this.props.game.users.find(user => {
            return user.id == e.target[0].value
        })
        console.log("Selected user id", e.target[0].value)
        console.log("Current user id", user.id)
        fetch(`${API_ROOT}/games/robber`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify({
                robber_id: user.id,
                selected_id: e.target[0].value
            })
        })
        this.setState({
            selected_id: selected.id,
            robbed: true
        })
    }

    render() {
        return (
            <div className="robber-page">
                <h2>You are a Robber</h2>
                <h3>At night, the Robber may choose to rob a card from another player and place his Robber card where the other card was. Then the Robber looks at his new card. The
                    player who receives the Robber card is on the village team. The Robber is on the team of the card he takes, however, he does not do the action of his new role at night.
                    If the Robber chooses not to rob a card from an- other player, he remains the Robber and is on the village team.</h3>
                    <img className="avatar" src="http://geekandsundry.com/wp-content/uploads/2017/02/Robber.png" />
                <div className="action">
                    {this.state.robbed
                    ?
                        this.renderFinished()
                    :
                        this.renderPlayers()
                    }
                </div>
            </div>
        )
    }
}

export default Robber;