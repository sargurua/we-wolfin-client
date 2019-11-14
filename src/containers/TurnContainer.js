import React, {Component} from 'react';
import {API_ROOT} from "../constants";
import Werewolf from '../role_components/Werewolf';
import Seer from '../role_components/Seer';
import Troublemaker from '../role_components/TroubleMaker';
import Robber from '../role_components/Robber';

class TurnContainer extends Component {

    checkWerewolf = () => {
        return <Werewolf game={this.props.game} />
    }

    checkSeer = () => {
        return <Seer name={this.props.name} game={this.props.game} />
    }

    checkRobber = () => {
        return <Robber name={this.props.name} game={this.props.game} />
    }

    checkTroublemaker = () => {
        return <Troublemaker name={this.props.name} game={this.props.game} />
    }

    renderCorrectTurn = () => {
        switch(this.props.role.name) {
            case "Werewolf":
                return this.checkWerewolf()
            case "Seer":
                return this.checkSeer()
            case "Robber":
                return this.checkRobber()
            case "Troublemaker":
                return this.checkTroublemaker()
            case "Day":
                console.log("Day");
            default:
                console.log(this.props.turn, this.props.role)
        }
    }

    render() {
        return (
            <div>
                { this.renderCorrectTurn() }
            </div>
        )
    }
}

export default TurnContainer;