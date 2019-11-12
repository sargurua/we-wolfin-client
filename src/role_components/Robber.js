import React, { Component } from 'react';

class Robber extends Component {
    renderPlayers = () => {
        return this.props.game.users.map(player => {
            return <p>{player.name}</p>
        })
    }

    render() {
        return (
            <div>
                <h2>You are a Robber</h2>
                <h3>At night, the Robber may choose to rob a card from another player and place his Robber card where the other card was. Then the Robber looks at his new card. The
                    player who receives the Robber card is on the village team. The Robber is on the team of the card he takes, however, he does not do the action of his new role at night.
                    If the Robber chooses not to rob a card from an- other player, he remains the Robber and is on the village team.</h3>
                <div className="action">
                    <h4>Player List:</h4>
                    { this.renderPlayers() }
                </div>
            </div>
        )
    }
}

export default Robber;