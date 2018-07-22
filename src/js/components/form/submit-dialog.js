import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import SummaryTable from './summary-table';

const styles = theme => ({
});

class SubmitDialog extends React.Component {
	handleClose = () => {
		this.props.changeState('submit_dialog', false);
	}

	render() {
		const { classes } = this.props;

		const actions = [
			<FlatButton
				name = "ok"
				label = "確定"
				primary = {true}
				onClick = {this.handleClose.bind(this)}
			/>
		];

		return (
			<Dialog
				actions = {actions}
				modal = {false}
				open = {this.props.submit_dialog}
			>
				{this.props.submit_success ?
					'我們收到囉！期待 11/24 與您見面 ^_^' :
					'送出失敗，請洽愛名或彥彬由我們手動幫您報名 Q_Q'
				}
			</Dialog>
		)
	}
}

SubmitDialog.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubmitDialog);
