import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import style from './style.js';

class LoadingSpinner extends Component {
    render() {
        return (
            <div style={style.loading}>
                <div style={style.loadingMessage}>{this.props.loadingMessage}</div>
                <CircularProgress size={80} thickness={5} />
            </div>
        )
    }
}

export default LoadingSpinner;
