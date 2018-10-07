import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class App extends Component {
  
  constructor() {
    super();
    this.state = {scores: []};
  }

  componentDidMount() {
    fetch('/api/scores')
      .then(res=> {
        console.log(res);
        return res.json();
      })
      .then(scores => {
        console.log(scores);
        this.setState({scores})
      });
  }

  render() {
    return (
      <div className="App">
      <div class="music-quiz-header"><h1>Music Quiz</h1></div>
        <Tabs>
          <TabList>
            <Tab>Quiz</Tab>
            <Tab>Leaderboard</Tab>
          </TabList>

          <TabPanel>
            <form class="player-details">
              <div class="player-details-field">
                <label for="user-name" >Username: </label> 
                <input type="text" id="user-name"/>
              </div>
              <div class="player-details-field">
                <label for="e-mail" >E-mail (optional):  </label> 
                <input type="text" id="e-mail"/>
              </div>
            </form>
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
