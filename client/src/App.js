import React, { Component } from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {PlayerDetailsField} from './FormComponents.js';

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
      <div className="music-quiz-header"><h1>Music Quiz</h1></div>
        <Tabs>
          <TabList>
            <Tab>Quiz</Tab>
            <Tab>Leaderboard</Tab>
          </TabList>

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
