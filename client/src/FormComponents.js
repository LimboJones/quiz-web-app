import React, { Component } from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap'

let nextId = 0;

class PlayerDetailsField extends React.Component {
    constructor(props, context) {
      super(props, context);
        
      this.state = {
        value: this.props.value,
        label: this.props.label ? this.props.label + ": " : "",
        hasHelp: this.props.hasHelp,
        helpText: this.props.helpText,
      };

      this.id = nextId;
      nextId += 1;
    }

    // TODO: Fix the popover UI. It is supposed to be a small box appearing to the right,
    //   as per: https://react-bootstrap.github.io/components/popovers/#popovers-overlay-trigger
    helpPopover() {
        return (
        <Popover id="help-popover-right" title="What do you do with my e-mail?">
            {this.props.helpText}
        </Popover>
        )
    }

    getHelpInfo() {
        if (this.props.hasHelp) {
            return (
                <OverlayTrigger trigger="click" placement="right" overlay={this.helpPopover()}>
                    <img src="/help.png" alt="Help" width={25} height={25}></img>
                </OverlayTrigger>
            )
        }
        else {
            return "";
        }
    }
  
    render() {
        return (
            <div className="player-details-field">
                <label htmlFor="user-name" >{this.state.label}</label> 
                <input type="text" id={this.id}/>
                {this.getHelpInfo()}
            </div>
        );
    }
}

PlayerDetailsField.defaultProps = {
    value: "",
    label: "",
    hasHelp: false,
    helpText: "",
  }

export {PlayerDetailsField};