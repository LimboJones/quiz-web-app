import React, { Component } from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {PlayerDetailsField} from './FormComponents.js';
import {QuizRound} from './QuizRound.js'


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

  generateRoundTables() {
    return this.state.rounds.map( (round, index) => ( 
      <QuizRound key={index} roundIndex={index} roundData={round}/>
    ));
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
