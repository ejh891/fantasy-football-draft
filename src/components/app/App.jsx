import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
 
import './app.css';
import AvailablePlayersList from '../availablePlayersList/AvailablePlayersList';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

class App extends Component {
    render() {
      return (
          <MuiThemeProvider>
              <AvailablePlayersList/>
          </MuiThemeProvider>
        );
    }
}

export default App;
