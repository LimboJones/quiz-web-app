import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class QuizRound extends Component {
    constructor(props) {
      super(props);
      this.state = {
        roundIndex: this.props.roundIndex,
        roundData: this.props.roundData,
        buttonText: "Start Round!",
        answers: {}
      };
    }
  
    updateRoundDisplay() {
      // First time logic - hidden
      console.log(this);
      console.log(this.state);
      if (typeof(this.state["showRound"]) === "undefined") {
        this.setState({"showRound": true, buttonText: "Hide Round" });
        return;
      }
      // All other times - toggle
      let newDisplayState;;
      let newButtonText;

      // On hide
      if (this.state.showRound) {
        newDisplayState = false;
        newButtonText = "View Round";
      }
      // On view
      else {
        newDisplayState = true;
        newButtonText = "Hide Round";
      }
      this.setState({"showRound": newDisplayState, buttonText: newButtonText});
      return;
    }

    updateAnswer(answer) {
      let answers = this.state.answers;
      //doesn't work - need to figure out how to get the event
      answers["answer-" + answer["index"]] = answer["text"];
      this.setState({ answers});
    }

    generateRoundTableRows(roundIndex) {
      let tableRows = [];
        for (let i=0; i < this.state.roundData.questions.length; i+=1) {
          tableRows.push(
            <tbody key={"tbody-" + i.toString()}>
              <tr>
                <td className="question-index-table-cell" key={i.toString() + "qi-tc-1"}>{i+1}</td>
                <td className="question-table-cell" key={i.toString() + "qi-tc-2"}>{this.state.roundData.questions[i]}</td>
                <td className="answer-table-cell" key={i.toString() + "qi-tc-3"} answer-index={i} 
                  onChange={e => this.updateAnswer({text: e.target.value, index: i})}>
                  <textarea placeholder="Type your answer here" defaultValue={this.state.answers["answer-" + i]}/>
                </td>
              </tr>
            </tbody>
          );
        }
      return tableRows;
      }
  
    render() {
      return (
        
        <div key={this.state.roundIndex.toString() + "-round"} className="quiz-round">
            <div className="quiz-round-title">
              <h2>{"Round " + (this.state.roundIndex+1).toString() + ": " + this.state.roundData.name}</h2>
              <button className="start-round-button" onClick={this.updateRoundDisplay.bind(this)}>{this.state.buttonText}</button>
            </div>
            {
              this.state["showRound"] ? 
                ([
                  <div key="round-table-div" id={"quiz-round-table-" + (this.state.roundIndex+1).toString()} className="quiz-round-table">
                  <Table key="round-table" striped bordered condensed>
                    <thead> 
                      <tr>
                        <th className="question-index-table-column">#</th>
                        <th className="question-table-column">Question</th>
                        <th className="answer-table-column">Answer</th>
                      </tr>
                    </thead>
                    {this.generateRoundTableRows()}
                  </Table>
                </div>
              ]) : ([]) }
          </div>
      )
    }
  }

  export {QuizRound};