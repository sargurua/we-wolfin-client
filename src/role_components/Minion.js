import React, {Component} from 'react'

class Minion extends Component {

    renderWerewolves = () => {
        const werewolves = this.props.game.users.filter(user => user.role.name === "Werewolf")
        return werewolves.map(user => <h3>{user.name}</h3>)
    }
    
    render() {
        return(
            <div className="werewolf-page">
                <div className="role-header">
                    <div className="role-description">
                        <h2>You are a Minion</h2>
                        <h3>Immediately following the Were-wolf phase at night, the Minion
wakes up and sees who the Were-wolves are.  The Werewolves don’t know who the Minion
is. If the Minion dies and no Werewolves die, the
Werewolves (and the Minion) win. If no players
are Werewolves, the Minion wins as long as one
other player (not the Minion) dies. </h3>
                    </div>
                    <div className="role-img">
                        <img className="avatar" src="https://cdn.shopify.com/s/files/1/0740/4855/products/Minion_2048x.png?v=1567511595" />
                    </div>
                </div>
                <div className="action">
                    <div className="werewolf-action">
                        <h2>The Werewolves for you to protect(if empty get an innocent killed)</h2>
                        {this.renderWerewolves()}
                    </div>
                </div>
            </div>
        )
    }
}   

export default Minion