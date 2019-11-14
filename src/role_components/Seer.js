import React, { Component } from 'react';

class Seer extends Component {
    state = {
        choiceMade: false,
        selectedHidden: [],
        hidden: [],
        users: [],
        buttonsGone: false,
        choosing: false,
        selectedUser: {},
        choiceBtn: ""

    }

    componentDidMount() {
        const hidden = this.props.game.roles.filter(role => role.hidden)
        this.setState({
            hidden,
            users: this.props.game.users
        })
    }

    // handleSelectedPlayer = event -> {

    // }

    renderHandlePlayerClick = () => {
        this.setState({
            buttonsGone: true,
            choosing: true,
            choiceBtn: "player"
        })
    }

    renderHandleHiddenClick = () =>{
        this.setState({
            buttonsGone: true,
            choosing: true,
            choiceBtn: "hidden"
        })
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
            <div onChange={this.handleChange}>
                <h3>Who you gonna see?</h3>
                <select>
                    {mapPlayers}
                </select>
            </div>
        )
    }

    renderFirstHidden = () => {
        const mapHidden = this.state.hidden.map((item, index) => {
            return (
                <option value={item.id}>Hidden Card {index + 1}</option>
            )
        })
        return (
            <div onChange={this.handleChange}>
                <h3>Who you gonna see?</h3>
                <select>
                    {mapHidden}
                </select>
            </div>
        )
    }

    renderSecondHidden = () => {
        const mapHidden = this.state.hidden.map((item, index) => {
            return (
                    <option value={item.id}>Hidden Card {index + 1}</option>
            )
        })
        return (
            <div onChange={this.handleChange}>
                <select>
                    {mapHidden}
                </select>
            </div>
        )
    }

    choosePlayer =(e) => {
        e.preventDefault()
        console.log(e.target[0].value)
        const selectedUser = this.props.game.users.find(user => {
            console.log(user)
            return user.id == e.target[0].value
        })
        this.setState({
            selectedUser,
            choiceMade: true,
            choosing: false
        })
    }

    chooseHidden = e => {
        e.preventDefault()
        const selectedHidden = this.state.hidden.filter(hidden => {
            console.log(hidden)
            return hidden.id == e.target[0].value || hidden.id == e.target[1].value
        })
        console.log("*********************",selectedHidden)
        this.setState({
            selectedHidden,
            choiceMade: true,
            choosing: false
        })
    }

    renderForm = () => {
        if(this.state.choiceBtn === "player") {
            return ( 
                <form className="seer-form" onSubmit={this.choosePlayer}>
                    {this.renderPlayers()}
                    <input type="submit" value="I Choose You!" />
                </form> )
        } else {
            return (
                <form className="seer-form" onSubmit={this.chooseHidden}>
                    {this.renderFirstHidden()}
                    {this.renderSecondHidden()}
                    <input type="submit" value="I Choose You Two!" />
                </form> )
        }
    }


    renderSelectedHidden = () => {
        return this.state.selectedHidden.map((hidden, index) => {
            return <p>Hidden {index + 1} is a {hidden.name}</p>
        })
    }

    render() {
        const style = this.state.buttonsGone ? {display: "none"} : {}
        return (
            <div className="seer-page">
                <div className="role-header">
                    <div className="role-description">
                        <h2>You are a Seer</h2>
                        <h3>At night, the Seer may look either at one other player's card or at two of the hidden cards, but does not move them.</h3>
                    </div>
                    <div className="role-img">
                        <img className="avatar" src="https://cdn.shopify.com/s/files/1/0740/4855/products/seer_2048x.png?v=1567511595" />
                    </div>
                </div>
                <div className="action">
                    <div className="seer-choice-btns">
                        <button style={style} className="view-player-btn" onClick={this.renderHandlePlayerClick}>View Players</button>
                        <button style={style} className="view-hidden-btn">View Hidden(This doesn't work- Icebox )</button>
                    </div>
                    { this.state.choosing 
                    ? 
                    this.renderForm()
                    :
                    null
                    }
                    {this.state.choiceMade
                    ?
                    <div className="seer-response">
                        <h3>You discovered...</h3>
                        {this.state.choiceBtn === "player"
                        ?
                        <p>{this.state.selectedUser.name} is a {this.state.selectedUser.role.name}</p>
                        :
                        this.renderSelectedHidden()
                        }
                        
                    </div>
                    :
                    null
                    }
                </div>
            </div>
        )
    }
}

export default Seer;