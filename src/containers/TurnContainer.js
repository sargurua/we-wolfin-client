import React, {Component} from 'react';
import {API_ROOT} from "../constants";
import Werewolf from '../role_components/Werewolf';
import Seer from '../role_components/Seer';
import Troublemaker from '../role_components/TroubleMaker';
import Robber from '../role_components/Robber';

class TurnContainer extends Component {

    checkWerewolf = (role) => {
      if(role === "Werewolf") {
        return <Werewolf game={this.props.game} />
      }
    }

    checkSeer = (role) => {
      if(role === "Seer") {
        return <Seer game={this.props.game} />
      }
    }

    checkRobber = (role) => {
      if(role === "Seer") {
        return <Seer game={this.props.game} />
      }
    }

    checkTroublemaker = (role) => {
      if(role === "Seer") {
        return <Seer game={this.props.game} />
      }
    }

    renderCorrectTurn = () => {
        console.log(this.props.turn, this.props.role)
        switch(this.props.turn) {
            case this.props.role === "Werewolf":
                return this.checkWerewolf(this.props.role)
            case this.props.role === "Seer":
                return this.checkSeer(this.props.role)
            case this.props.role === "Robber":
                return this.checkRobber(this.props.role)
            case this.props.role === "Troublemaker":
                return this.checkTroublemaker(this.props.role)
            case this.props.role === "Day":
                console.log("Day");
            default:
        }
    }

    render() {
        return (
            <div>
                { this.renderCorrectTurn() }
                <p>Turn Container</p>
            </div>
        )
    }
}

export default TurnContainer;