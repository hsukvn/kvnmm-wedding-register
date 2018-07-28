import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import SummaryTable from './summary-table';

const styles = theme => ({
});

class VerifyDialog extends React.Component {
	constructor() {
		super()
		this.state = {
			submitting: false,
		}
	}

	changeState(key, val) {
		var state = {};
		state[key] = val;
		this.setState(state);
	}

	handleCancel = () => {
		this.props.changeState('dialog', false);
	}

	handleSubmit(e) {
		this.changeState('submitting', true);
		// call api
		$.ajax({
			url: '/api/attendee',
			dataType: 'json',
			type: 'POST',
			data: {
				name: this.props.name,
				relation: this.props.relation,
				members: (this.props.attend === 'coming') ? this.props.members : [],
				attend: (this.props.attend === 'coming'),
				paper_invitation: (this.props.invitation === 'paper_invitation'),
				email: this.props.email,
				phone: this.props.phone,
				address: this.props.address,
				message: this.props.message,
			},
			success: function(data) {
				this.changeState('submitting', false);
				this.props.changeState('dialog', false);
				this.props.changeState('submit_dialog', true);
				this.props.changeState('submit_success', true);
			}.bind(this),
			error: function(xhr, status, err) {
				this.changeState('submitting', false);
				this.props.changeState('dialog', false);
				this.props.changeState('submit_dialog', true);
				this.props.changeState('submit_success', false);
			}.bind(this)
		})
	}

	render() {
		const { classes } = this.props;

		const actions = [
			<FlatButton
				name = "cancel"
				label = "再改改"
				primary = {true}
				disabled = {this.state.submitting}
				onClick = {this.handleCancel.bind(this)}
			/>,
			<FlatButton
				name = "submit"
				label = {this.state.submitting ? '送出中' : '送出個'}
				primary = {true}
				disabled = {this.state.submitting}
				onClick = {this.handleSubmit.bind(this)}
			/>
		];

		return (
			<Dialog
				title = "確認一下"
				actions = {actions}
				modal = {false}
				open = {this.props.dialog}
				autoScrollBodyContent = {true}
				onRequestClose = {this.handleCancel.bind(this)}
			>
				<SummaryTable
					name={this.props.name}
					relation={this.props.relation}
					members={this.props.members}
					attend={this.props.attend}
					invitation={this.props.invitation}
					email={this.props.email}
					phone={this.props.phone}
					address={this.props.address}
					message={this.props.message}
				/>
			</Dialog>
		)
	}
}

VerifyDialog.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerifyDialog);
