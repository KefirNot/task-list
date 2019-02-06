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

const Row = ({ editable, label, value, error, onChange, variant }) => editable
    ? (
        <TextField
            error={!!error}
            label={error || label}
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
        error: PropTypes.object.isRequired,
        onClose: PropTypes.func,
        onCreateTask: PropTypes.func,
        onEditTask: PropTypes.func,
        fullScreen: PropTypes.bool,
    }

    static defaultProps = {
        error: {},
    }

    handleChange = property => event => {
        const { onEditForm } = this.props;

        onEditForm(property, event.target.value);
    };

    handleSendForm = () => {
        const { id, username, email, text, status, onCreateTask, onEditTask } = this.props;

        if (id) {
            onEditTask(id, username, email, text, status)
        } else {
            onCreateTask(username, email, text);
        }
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
                <Row editable={!id} variant='body1' label='User' value={username} onChange={this.handleChange('username')} error={error.username} />
                <Row editable={!id} variant='caption' label='E-mail' value={email} onChange={this.handleChange('email')} error={error.email} />
                <Row editable variant='body2' label='Text' value={text} onChange={this.handleChange('text')} error={error.text} />
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
        onCreateTask: (username, email, text) => dispatch(actions.createTask({ username, email, text })),
        onEditTask: (id, username, email, text, status) => dispatch(actions.editTask({ id, username, email, text, status })),
    })
)(withMobileDialog()(ResponsiveDialog));