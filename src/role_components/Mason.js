import React, {Component} from 'react'

class Mason extends Component {

    renderMasons = () => {
        const masons = this.props.game.users.filter(user => {
            if (user.role === null){
                user.role = {name: "Mason"}
            }
            return user.role.name === "Mason"
        })
        return masons.map(user => <h3>{user.name}</h3>)
    }
    
    render() {
        return(
            <div className="werewolf-page">
                <div className="role-header">
                    <div className="role-description">
                        <h2>You are a Mason</h2>
                        <h3>At night, all the two Masons open their eyes and look for other masons. If no one else opens their eyes, the other Mason is in the center.</h3>
                    </div>
                    <div className="role-img">
                        <img className="avatar" src="http://onenightultimate.com/wp-content/uploads/2015/08/mason.png" />
                    </div>
                </div>
                <div className="action">
                    <div className="werewolf-action">
                        <h2>Your Fellow Masons (If it is just you, your other mason is in the center) </h2>
                        {this.renderMasons()}
                    </div>
                </div>
            </div>
        )
    }
}   

export default Mason