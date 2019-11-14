import React, {Component} from 'react'

class Werewolf extends Component {

    renderWerewolves = () => {
        const werewolves = this.props.game.users.filter(user => {
            if (user.role === null){
                user.role = {name: "Werewolf"}
            }
            return user.role.name === "Werewolf"
        })
        return werewolves.map(user => <h3>{user.name}</h3>)
    }
    
    render() {
        return(
            <div className="werewolf-page">
                <div className="role-header">
                    <div className="role-description">
                        <h2>You are a Werewolf</h2>
                        <h3>At night, all Werewolves open their eyes and look for other werewolves. If no one else opens their eyes, the other Werewolves are in the center.</h3>
                    </div>
                    <div className="role-img">
                        <img className="avatar" src="https://i.imgur.com/p3G2DAx.png" />
                    </div>
                </div>
                <div className="action">
                    <div className="werewolf-action">
                        <h2>Your Fellow Werewolves</h2>
                        {this.renderWerewolves()}
                    </div>
                </div>
            </div>
        )
    }
}   

export default Werewolf