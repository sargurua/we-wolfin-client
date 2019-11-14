import React, { Component } from 'react';


class Insomniac extends Component {

    renderDisplay = () => {
        const user = this.props.game.users.find(user => {
           return user.name === this.props.name
        })

        return (
            <div className="robber-response">
                <h3>Your starting role was Insomniac</h3>
                {
                user.role.name === "Insomniac"
                ?
                    <h4>You are still the Insomniac</h4>
                :
                    <h4>You are now a {user.role.name}</h4>
                }
            </div>
        )
    }

    render() {
        return (
            <div className="robber-page">
                <div className="role-header">
                    <div className="role-description">
                        <h2>You are a Insomniac</h2>
                        <h3>The Insomniac wakes up and
looks at their card (to see if it has
changed)</h3>
                    </div>
                    <div className="role-img">
                    <img className="avatar" src="http://onenightultimate.com/wp-content/uploads/2015/08/insomniac.jpg" />
                    </div>
                </div>
                <div className="action">
                    {this.renderDisplay()}
                </div>
            </div>
        )
    }
}

export default Insomniac;