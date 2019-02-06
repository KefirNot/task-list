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

const NEW_TASK = 'New Task';
const EDIT_TASK = 'Edit Task';

const Row = ({ editable, label, value, onChange, variant }) => editable
    ? (
        <TextField
            autoFocus
            label={label}
            onChange={onChange}
            value={value}
            margin='dense'
            fullWidth
            multiline
        />
    ) : (
        <Typography
            variant={variant}
            gutterBottom
        >
            {label}: {value}
        </Typography>
    );

class ResponsiveDialog extends React.Component {
    static propTypes = {
        open: PropTypes.bool,
        id: PropTypes.number,
        username: PropTypes.string,
        email: PropTypes.string,
        text: PropTypes.string,
        status: PropTypes.number,
        error: PropTypes.object,
        onClose: PropTypes.func,
        onConfirm: PropTypes.func,
        fullScreen: PropTypes.bool,
    }

    handleChange = property => event => {
        const { onEditForm } = this.props;

        onEditForm(property, event.target.value);
    };

    handleSendForm = () => {
        const { onLogin } = this.props;
        const { login, pass } = this.state;

        onLogin(login, pass);
    }

    get title() {
        const { id } = this.props;
        const title = id ? EDIT_TASK : NEW_TASK;
        return (
            <DialogTitle>
                {title}
            </DialogTitle>
        );
    }

    get content() {
        const { id, username, email, text, loading, error } = this.props;

        if (loading) {
            return (
                <DialogContent>
                    <Loading />
                </DialogContent>
            );
        }

        return (
            <DialogContent>
                <Row editable={!id} variant='body1' label='User' value={username} onChange={this.handleChange('username')} />
                <Row editable={!id} variant='caption' label='E-mail' value={email} onChange={this.handleChange('email')} />
                <Row editable variant='body2' label='Text' value={text} onChange={this.handleChange('text')} />
            </DialogContent>
        );
    }

    get actions() {
        const { onClose } = this.props;

        return (
            <DialogActions>
                <Button
                    onClick={this.handleSendForm}
                    variant='contained'
                    color='primary'
                >
                    Ok
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

export default connect(
    state => ({ ...state.form }),
    dispatch => ({
        onClose: () => dispatch(actions.hideForm()),
        onEditForm: (property, value) => dispatch(actions.editForm(property, value)),
        onLogin: (login, pass) => dispatch(actions.login({ login, pass }))
    })
)(withMobileDialog()(ResponsiveDialog));