import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

import * as authActions from '../../redux/actions/authActions';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { firebaseAuth, firebaseFacebookAuthProvider } from '../../config/firebase';

class LogIn extends Component {
    signIn = () => {
        this.props.authActions.setUserLoggingIn(true);
        firebaseAuth().signInWithPopup(firebaseFacebookAuthProvider);
    }
    
    getPageContent = () => {
        if (this.props.userLoggingIn) {
            return (<LoadingSpinner loadingMessage={"Logging you in!"}/>)
        } else {
            return (
                <div style={{padding: '10px'}}>
                    <h1 style={{textAlign: 'center'}}>Welcome to the draft</h1>
                    <RaisedButton
                        backgroundColor={'#3B5998'}
                        fullWidth={true}
                        onClick={this.signIn}
                        labelStyle={{color: 'white'}}
                        icon={<FontIcon className="fa fa-facebook-official" />}
                        label={'Continue with Facebook'}
                    >
                    </RaisedButton>
                </div>
            )
        }
    }
    render() {
        const pageContent = this.getPageContent();
        return pageContent;
    }
}


const mapStateToProps = (state, props) => {
	return {
        userLoggingIn: state.auth.userLoggingIn,
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
