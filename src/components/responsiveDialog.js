import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography, withMobileDialog } from '@material-ui/core';
import * as actions from '../store/actions';

class ResponsiveDialog extends React.Component {
    static propTypes = {
        open: PropTypes.bool,
        error: PropTypes.string,
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

    render() {
        const { open, error, onClose, onLogin, fullScreen } = this.props;

        const dialogProps = {
            fullScreen,
            open,
            onClose,
        };

        const inputProps = {
            margin: 'dense',
            fullWidth: true,
        };

        return (
            <Dialog {...dialogProps}>
                <DialogTitle>Вход</DialogTitle>
                <DialogContent>
                    <Typography variant='subtitle2' color='error'>
                        {error}
                    </Typography>
                    <TextField
                        autoFocus
                        label='Логин'
                        onChange={this.handleChange('login')}
                        value={this.state.login}
                        {...inputProps}
                    />
                    <TextField
                        label='Пароль'
                        onChange={this.handleChange('pass')}
                        value={this.state.pass}
                        type='password'
                        {...inputProps}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onLogin(this.state.login, this.state.pass)} variant='contained' color='primary'>
                        Ок
                    </Button>
                    <Button onClick={onClose} color='secondary'>
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(
    state => ({ open: state.auth.show, error: state.auth.error }),
    dispatch => ({
        onClose: () => dispatch(actions.hideAuthorization()),
        onLogin: (login, pass) => dispatch(actions.login({ login, pass }))
    })
)(withMobileDialog()(ResponsiveDialog));