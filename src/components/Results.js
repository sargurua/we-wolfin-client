import React, {Component} from 'react'
import {API_ROOT} from '../constants'
import {withRouter} from 'react-router-dom'

class Results extends Component {
    state = {
        game: null,
        found: true,
        townWin: null,
        killed: null,
        timer: 15
    }

    intervalId1 = 0
    intervalId2 = 0

    componentDidMount() {
        this.intervalId1 = setInterval(this.setResults, 1000)
        this.intervalId2 = setInterval(this.setTime, 1000)
    }

    setTime = () => {
        if (this.state.timer === 0){
            fetch(`${API_ROOT}/seperate`)
            this.props.history.push('/')
        }
        this.setState({
            timer: this.state.timer - 1
        })
    }

    componentWillUnmount() {
        clearInterval(this.intervalId1)
        clearInterval(this.intervalId2)
    }

    setResults = () => {
        let killed = []
        let newWin = this.didTownWin()
        fetch(`${API_ROOT}/users/won`)
        .then(resp => resp.json())
        .then(data => {
            killed = data
        })

        if(this.props.name !== ""){
            fetch(`${API_ROOT}/games/1`)
            .then(resp => resp.json())
            .then(json => this.setState({
                game: json,
                killed: killed,
                found: false,
                townWin: newWin
            }))
            .catch(error => {
                this.setState({
                    game: null
                })
            })
        }

        else {
            this.props.history.push("/error")
        }
    }


    // whoDied = (json) => {
    //     console.log("WEEEEEEEEEEEEEEEEE")
    //     const newWin = this.didTownWin()
    //     fetch(`${API_ROOT}/users/won`)
    //     .then(resp => resp.json())
    //     .then(data => this.setState({
    //         game: json,
    //         found: false,
    //         killed: data,
    //         townWin: newWin
    //     }))
    // }
    
    renderResults = () => {
        return this.displayResults()
    }

    displayResults = () => {
        if (this.state.townWin !== null && this.state.game.users !== undefined){
            const user = this.state.game.users.find(user => user.name === this.props.name)
            const isUserTown = user.role.name !== "Werewolf"
    
            if ((this.state.townWin && isUserTown) || (!this.state.townWin && !isUserTown)){
                return <div className="results-result">You Win</div>
            }
            else{
                return <div className="results-result">You lose</div>
            }
        }
    }


    didTownWin = () => {
        if (this.state.killed && this.state.game && this.state.game.users !== undefined){
            const werewolves = this.state.game.users.filter(user => user.role.name === "Werewolf")
            const killedRoles = this.state.killed.map(user => user.role.name)

            let newWin = null

            console.log(werewolves)

            if (werewolves.length === 0 && this.state.killed.length === 0){
                console.log("1")
                newWin = true
            }
            else if (werewolves.length === 0 && this.state.killed.length !== 0){
                console.log("2")
                newWin = false
            }
            else if (werewolves.length !== 0 && this.state.killed.length === 0){
                console.log("3")
                newWin = false
            }
            else if (killedRoles.includes("Werewolf")){
                console.log("4")
                newWin = true
            }
            else {
                console.log("5")
                newWin = false
            }

            return newWin
        }
    }

    render () {
        return (
            <div className="results-page">
                <h2>Game Over {this.state.timer}</h2>
                {
                this.state.found
                ?
                null
                :
                this.renderResults()
                }
            </div>
        )
    }
}

export default withRouter(Results)