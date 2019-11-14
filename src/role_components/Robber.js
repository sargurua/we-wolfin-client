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
            <div className="robber-action-form">
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
            <div className="robber-response">
                <h3>You have robbed {selected.name}</h3>
                <h4>Your new role is {user.role.name}</h4>
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
                <div className="role-header">
                    <div className="role-description">
                        <h2>You are a Robber</h2>
                        <h3>At night, the Robber may choose to rob a card from another player and become their role. The new role can change the robber's team.</h3>
                    </div>
                    <div className="role-img">
                    <img className="avatar" src="http://geekandsundry.com/wp-content/uploads/2017/02/Robber.png" />
                    </div>
                </div>
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