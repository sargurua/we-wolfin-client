import React, {Component} from 'react'
import {API_ROOT} from "../constants"
import {withRouter} from 'react-router-dom'
import CreateGame from './CreateGame'
import JoinGame from './JoinGame'

class Buttons extends Component {
    state = {
        gameExists: true
    }

    intervalId = 0;

    checkForGame = () => {
        console.log("fetching")
        fetch(`${API_ROOT}/games`)
        .then(res => res.json())
        .then(games => {
            let gameExists = false
            if(games[0] !== undefined){
                gameExists = true
            }
            this.setState({
                gameExists
            })
        })
    }

    componentDidMount() {
        this.intervalId = setInterval(this.checkForGame, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        return (
            <div>
                {
                    this.state.gameExists
                    ?
                    <JoinGame submitName={this.props.submitName}/>
                    :
                    <CreateGame submitName={this.props.submitName}/>
                }
            </div>
        )
    }
}

export default withRouter(Buttons)