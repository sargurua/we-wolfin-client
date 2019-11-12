import React, {Component} from 'react'

class Werewolf extends Component {

    renderWerewolves = () => {
        const werewolves = this.props.game.users.filter(user => user.role.name === "Werewolf")
        return werewolves.map(user => <p>{user.name}</p>)
    }
    
    render() {
        return(
            <div>
                <h2>You are a Werewolf</h2>
                <h3>At night, all Werewolves open their eyes and look for other werewolves. If no one else opens their eyes, the other Werewolves are in the center.</h3>
                <div className="action">
                    <h4>Fellow Werewolves</h4>
                    {this.renderWerewolves()}
                </div>
            </div>
        )
    }
}   

export default Werewolf