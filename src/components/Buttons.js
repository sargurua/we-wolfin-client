import React, {Component} from 'react'
import {API_ROOT} from "../constants"
import {withRouter} from 'react-router-dom'
import CreateGame from './CreateGame'
import JoinGame from './JoinGame'

class Buttons extends Component {
    state = {
        gameExists: null
    }

    intervalId = 0;

    checkForGame = () => {
        console.log(this.state.gameExists)
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
        this.intervalId = setInterval(this.checkForGame, 1000)
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
                    this.state.gameExists === null
                    ?
                    <h2>Loading....</h2>
                    :
                    <CreateGame submitName={this.props.submitName}/>
                }
            </div>
        )
    }
}

export default withRouter(Buttons)