import React, {Component} from 'react'
import {API_ROOT, HEADERS} from '../constants'
import {withRouter} from 'react-router-dom'

class VotingScreen extends Component {
    state = {
        game: null,
        choiceMade: false,
        timer: 15
    }

    intervalId1 = 0
    intervalId2 = 0

    componentDidMount() {
        this.intervalId1 = setInterval(this.setTime, 1000)
        this.intervalId2 = setInterval(this.fetchGame, 4000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId1)
        clearInterval(this.intervalId2)
    }

    setTime = () => {
        if (this.state.timer === 0){
            this.props.history.push("/end")
        }
        this.setState({
            timer: this.state.timer - 1
        })
    }

    fetchGame = () => {
        fetch(`${API_ROOT}/games/1`)
        .then(resp => resp.json())
        .then(json => {
            this.setState({
                game: json
            })
        })
    }

    renderOptions = () => {
        console.log(this.state.game)
        if (this.state.game){
            const playerOptions = this.state.game.users.map(user => {
                if (user.name !== this.props.name){
                    return <option value={user.id}>{user.name}</option>
                }
            })
            return playerOptions
        }
    }

    renderVoteForm = () => {
        return(
            <form className="vote-form" onSubmit={this.handleSubmit}>
                <select>
                    {this.renderOptions()}
                </select>
                <input type="submit"></input>
            </form>
        )
    }

    handleSubmit = e => {
        e.preventDefault()
        fetch(`${API_ROOT}/games/vote`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify({
                user_id: e.target[0].value
            })
        })
        this.setState({
            choiceMade: true
        })
    }

    // renderVotes = () =>{
    //     this.fetchGame()
    //     if(this.state.game){
    //         const userVotes = this.state.game.users.map(user => {
    //             return <p>{user.name}: {user.votes} Vote(s)</p>
    //         })
    //         return (
    //             <div>
    //                 <h4>Votes</h4>
    //                 {userVotes}
    //             </div>
    //         )
    //     }
    // }

    render () {
        return (
            <div className="vote-page">
                <h1>Time Left To Vote: {this.state.timer}</h1>
                {
                this.state.choiceMade
                ?
                <h2>You Been Votin'</h2>
                :
                <div className="vote-choice">
                    <h3>Who you Votin'</h3>
                    {this.renderVoteForm()}
                </div>
                }
            </div>
        )
    }
}

export default withRouter(VotingScreen)