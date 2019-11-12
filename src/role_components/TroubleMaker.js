import React, { Component } from 'react';

class Troublemaker extends Component {
    renderPlayers = () => {
        return this.props.game.users.map(player => {
            return <p>{player.name}</p>
        })
    }

    render() {
        return (
            <div>
                <h2>You are a Troublemaker</h2>
                <h3>At night, the Troublemaker may switch the cards of two other players without looking at those The players who receive 1 a different card are now the role (and team) of their new card, even though they don't know what role that is until the end of the game. The Troublemaker is on the village team.</h3>
                <div className="action">
                    <h4>Player List:</h4>
                    { this.renderPlayers() }
                </div>
            </div>
        )
    }
}

export default Troublemaker;