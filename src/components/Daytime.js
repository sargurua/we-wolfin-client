import React, {Component} from 'react'
import {API_ROOT, HEADERS} from '../constants'
import VotingScreen from './VotingScreen'

class Daytime extends Component {

    state = {
        game: {},
        timer: "Waiting",
        discuss: true
    }

    intervalId1 = 0
    intervalId2 = 0

    componentDidMount () {
        this.setState({
            timer: 300
        })

        this.intervalId1 = setInterval(this.changeTime, 1000)
        this.intervalId2 = setInterval(this.checkGame, 2000)
        
    }

    checkGame = () => {
        fetch(`${API_ROOT}/games/1`)
        .then(resp => resp.json())
        .then(game => {
            console.log(game)
            this.setState({
                game
            })
        })
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    changeTime = () => {
        if(this.state.timer <= 0 ) {
            clearInterval(this.intervalId1)
            clearInterval(this.intervalId2)
            fetch(`${API_ROOT}/games/votingTime`, {
                method: "PATCH",
                headers: HEADERS,
                body: JSON.stringify({
                    voting: true
                })
            })
            this.setState({
                discuss: false
            })
        }
        if (this.state.game.voting === true) {
            clearInterval(this.intervalId1)
            clearInterval(this.intervalId2)
            this.setState({
                discuss: false
            })
        }
        if (this.state.timer !== "Waiting" && this.state.time !== 0) {
            this.setState({
                timer: this.state.timer - 1
            })
        }
    }

    renderDay = () => {
        return (
            <div className="day-page">
                <div className="day-header">
                    <h2>The sun has risen, take some time to discuss and determine who the werewolves are!</h2>
                    <img src="https://untappd.akamaized.net/site/beer_logos_hd/beer-1043843_be98a_hd.jpeg" />
                </div>
                <div className="day-body">
                    <h3>Timer counting down</h3>
                    <h4>time left until vote: {this.state.timer}</h4>
                </div>
            </div>
        )
    }

    renderVote = () => {
       return <VotingScreen name={this.props.name}/>
    }

    render() {
        return (
            <div>
                {this.state.discuss
                ?
                this.renderDay()
                :
                this.renderVote()
                }
            </div>
        )
    }
}

export default Daytime;