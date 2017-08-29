import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './app.css';
import AvailablePlayersList from '../availablePlayersList/AvailablePlayersList';

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
