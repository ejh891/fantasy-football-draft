import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
 
import './app.css';
import PlayerList from '../playerList/PlayerList';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

class App extends Component {
    render() {
      return (
          <MuiThemeProvider>
              <PlayerList/>
          </MuiThemeProvider>
        );
    }
}

export default App;
