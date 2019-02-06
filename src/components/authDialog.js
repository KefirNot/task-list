import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Typography,
    withMobileDialog
} from '@material-ui/core';
import * as actions from '../store/actions';
import Loading from './loading';

class ResponsiveDialog extends React.Component {
    static propTypes = {
        open: PropTypes.bool,
        error: PropTypes.string,
        loading: PropTypes.bool,
        onClose: PropTypes.func,
        onLogin: PropTypes.func,
        fullScreen: PropTypes.bool,
    }

    state = {
        login: '',
        pass: '',
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleLogin = () => {
        const { onLogin } = this.props;
        const { login, pass } = this.state;

        onLogin(login, pass);
    }

    get title() {
        return (
            <DialogTitle>
                Auth
            </DialogTitle>
        );
    }

    get content() {
        const { error, loading } = this.props;
        const { login, pass } = this.state;

        if (loading) {
            return (
                <DialogContent>
                    <Loading />
                </DialogContent>
            );
        }

        const inputProps = {
            margin: 'dense',
            fullWidth: true,
        };
        return (
            <DialogContent>
                <Typography
                    variant='subtitle2'
                    color='error'
                >
                    {error}
                </Typography>
                <TextField
                    autoFocus
                    label='Login'
                    onChange={this.handleChange('login')}
                    value={login}
                    {...inputProps}
                />
                <TextField
                    label='Password'
                    onChange={this.handleChange('pass')}
                    value={pass}
                    type='password'
                    {...inputProps}
                />
            </DialogContent>
        );
    }

    get actions() {
        const { onClose } = this.props;

        return (
            <DialogActions>
                <Button
                    onClick={this.handleLogin}
                    variant='contained'
                    color='primary'
                >
                    Login
                </Button>
                <Button
                    onClick={onClose}
                    color='secondary'
                >
                    Cancel
                </Button>
            </DialogActions>
        );
    }

    render() {
        const { open, onClose, fullScreen } = this.props;

        const dialogProps = {
            fullScreen,
            open,
            onClose,
        };

        return (
            <Dialog {...dialogProps}>
                {this.title}
                {this.content}
                {this.actions}
            </Dialog>
        );
    }
}

const dialogWithMobile = withMobileDialog()(ResponsiveDialog);

export default connect(
    state => ({ ...state.auth }),
    dispatch => ({
        onClose: () => dispatch(actions.hideAuthorization()),
        onLogin: (login, pass) => dispatch(actions.login({ login, pass }))
    })
)(dialogWithMobile);