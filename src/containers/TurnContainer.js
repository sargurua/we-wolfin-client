import React, {Component} from 'react';
import {API_ROOT} from "../constants";
import Werewolf from '../role_components/Werewolf';
import Seer from '../role_components/Seer';
import Troublemaker from '../role_components/TroubleMaker';
import Robber from '../role_components/Robber';
import Minion from '../role_components/Minion';
import Insomniac from '../role_components/Insomniac'
import Mason from '../role_components/Mason'

class TurnContainer extends Component {

    checkWerewolf = () => {
        return <Werewolf game={this.props.game} />
    }

    checkMinion = () => {
        return <Minion game={this.props.game} />
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

    checkInsomniac = () => {
        return <Insomniac name={this.props.name} game={this.props.game} />
    }

    checkMason = () => {
        return <Mason name={this.props.name} game={this.props.game} />
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
            case "Minion":
                return this.checkMinion()
            case "Insomniac":
                return this.checkInsomniac()
            case "Mason":
                return this.checkMason()
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