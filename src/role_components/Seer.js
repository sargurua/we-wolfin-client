import React, { Component } from 'react';

class Seer extends Component {
    renderPlayers = () => {
        return this.props.game.users.map(player => {
            return <p>{player.name}</p>
        })
    }

    render() {
        return (
            <div>
                <h2>You are a Seer</h2>
                <h3>At night, the Seer may look either at one other player's card or at two of the center cards, but does not move them.</h3>
                <div className="action">
                    <h4>Player List:</h4>
                    { this.renderPlayers() }
                </div>
            </div>
        )
    }
}

export default Seer;