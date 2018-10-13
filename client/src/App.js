import React, { Component } from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {PlayerDetailsField} from './FormComponents.js';
import {Table} from 'react-bootstrap';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      scores: [],
      rounds: [],
      defaultVolume: -99  // Using negative weeks for testing.
    };
  }

  componentDidMount() {
    this.getLeaderboardScores();
    this.getQuizRounds();
  }

  getLeaderboardScores() {
    fetch('/api/scores')
      .then(res=> {
        return res.json();
      })
      .then(scores => {
        this.setState({scores})
      });
  }

  getQuizRounds() {
    fetch(`/api/rounds?volume=${this.state.defaultVolume}`)
      .then (res => {
        return res.json();
      })
      .then(rounds => {
        this.setState({rounds})
      });
  }

  generateRoundTableRows(roundIndex) {
    let tableRows = [];
      for (let i=0; i < this.state.rounds[roundIndex].questions.length; i+=1) {
        tableRows.push(
          <tbody key={"tbody-" + i.toString()}>
            <tr>
              <td className="question-index-table-cell" key={i.toString() + "qi-tc-1"}>{i+1}</td>
              <td className="question-table-cell" key={i.toString() + "qi-tc-2"}>{this.state.rounds[roundIndex].questions[i]}</td>
              <td className="answer-table-cell" key={i.toString() + "qi-tc-3"}>
                <textarea/>
              </td>
            </tr>
          </tbody>
        );
      }
    return tableRows;
    }

  updateRoundDisplay(roundIndex) {
    // First time logic - hidden
    console.log(this.state);
    if (this.state["showRound"+roundIndex] === undefined) {
      this.setState({["showRound"+roundIndex.toString()]: true });
      return;
    }
    // All other times - toggle
    let newState = !this.state["showRound"+roundIndex.toString()];
    this.setState({["showRound"+roundIndex.toString()]: newState});
    return;
  }

  generateRoundTables() {
    let tables = []
    for (let i=0; i < this.state.rounds.length; i+=1) {
      tables.push (
        <div key={i.toString() + "-round"} className="quiz-round">
          <div className="quiz-round-title">
            <h2>{"Round " + (i+1).toString() + ": " + this.state.rounds[i].name}</h2>
            <button className="start-round-button" onClick={ () => this.updateRoundDisplay(i+1)}>Start Round!</button>
          </div>
          {console.log("Checking for showRound" + (i+1).toString() + ": " + this.state["showRound"+(i+1).toString()])}
          {
            this.state["showRound"+(i+1).toString()] ? 
              ([
                <div key="round-table-div" id={"quiz-round-table-" + (i+1).toString()} className="quiz-round-table">
                <Table key="round-table" striped bordered condensed>
                  <thead> 
                    <tr>
                      <th className="question-index-table-column">#</th>
                      <th className="question-table-column">Question</th>
                      <th className="answer-table-column">Answer</th>
                    </tr>
                  </thead>
                  {this.generateRoundTableRows(i)}
                </Table>
              </div>
            ]) : ([]) }
        </div>
      );
    }
    return tables;
  }

  render() {
    return (
      <div className="App">
      <div className="quiz-header"><h1>Quiz</h1></div>
        <Tabs>
          <TabList>
            <Tab>Quiz</Tab>
            <Tab>Leaderboard</Tab>
          </TabList>

          {/* QUIZ TAB*/}
          <TabPanel>
            <form className="player-details">
              <PlayerDetailsField label="Username"/>
              OR
              <PlayerDetailsField label="E-mail (optional)" hasHelp={true} 
                helpText="If you have a Gravatar account, 
                we can use your email address to display your handle and avatar on the leaderboard. 
                We will neither store your email address anywhere, nor use it for anything other than this purpose."/>
                {/*MD5 hash can be stored in order to retrieve the gravatar info on subsequent occasions.*/}
            </form>
            <div className="quiz">
              {this.generateRoundTables()}
            </div>
          </TabPanel>
          
          <TabPanel>
            <h2>Leaderboard</h2>
            {this.state.scores.map(score =>
              <div key={score.id}>user: {score.user} score: {score.score} </div>
            )}
          </TabPanel>
          

        </Tabs>
      </div>
    );
  }
}

export default App;
