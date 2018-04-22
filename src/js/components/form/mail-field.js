import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
});

class MailField extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<TextField
				name="email"
				floatingLabelText="E-Mail"
				type="email"
				onChange={this.props.onChange}
				value={this.props.value}
			/>
		);
	}
}

MailField.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MailField);
