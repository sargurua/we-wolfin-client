import React, {Component} from 'react';
import {API_ROOT, HEADERS} from '../constants'
import { withRouter } from 'react-router-dom'

class JoinGame extends Component {
    state = {
        name: "",
        game_id: 1
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = event => {
        event.preventDefault()
        console.log("submitted")
        this.props.history.push('/lobby')
        fetch(`${API_ROOT}/users`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(this.state)
        });

        this.props.submitName(this.state.name)

        this.setState({
            name: "",
            game_id: 1
        });
    }
    
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>Join Game</h3>
                <div>
                    <label for="join-name">Name</label>
                    <input name="name" id="join-name" type="text" placeholder="Please enter name..." onChange={this.handleChange}></input>    
                </div>
{/* 
                <div>
                    <label for="game_id">Game Code</label>
                    <input name="game_id" id="game_id" type="text" placeholder="Please enter name..." onChange={this.handleChange}></input>    
                </div> */}
                
                <div>
                    <input type="submit"></input>
                </div>
            </form>
        )
        
    }
}

export default withRouter(JoinGame)