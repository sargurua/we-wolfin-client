import React, {Component} from 'react';
import {API_ROOT, HEADERS} from "../constants"
import {withRouter} from "react-router-dom";


class CreateGame extends Component {
    state = {
        name: "",
        day: "8",
        night: "8",
        num_players: "7"
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value 
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        
        this.props.history.push('/lobby')

        fetch(`${API_ROOT}/games`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(this.state)
        })

        this.props.submitName(this.state.name)

        this.setState({
            name: "",
            day: "8",
            night: "8",
            num_players: "7"
        })

    }
    render(){
        return (
            <form className="create-form" onSubmit={this.handleSubmit}>
                <h2>Create a Game</h2>
                <div>
                    <label for="name">Enter your name: </label><br/>
                    <input type="text" name="name" id="name" onChange={this.handleChange}></input>
                </div>
    
                <div>
                    <label for="num_players"># of players:</label><br/>
                    <select className="create-dd" id="num_players" onChange={this.handleChange}>
                        <option>7</option>
                    </select>
                </div>
    
                {/* <div>
                    <label for="day">Day Duration (min):</label><br/>
                    <select className="create-dd" id="day" onChange={this.handleChange}>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                </div> */}
    
                {/* <div>
                    <label for="night">Night Duration (min):</label><br/>
                    <select className="create-dd" id="night" onChange={this.handleChange}>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                </div> */}
    
                <input className="create-btn" onClick={this.props.thereIsAGame} type="submit"></input>
            </form>
        )
    }
}

export default withRouter(CreateGame);