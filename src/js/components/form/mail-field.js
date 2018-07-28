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
				id="email"
				name="email"
				floatingLabelText="E-Mail"
				errorText={this.props.error}
				type="email"
				onChange={this.props.onChange}
				value={this.props.value}
				style={{width: '100%'}}
			/>
		);
	}
}

MailField.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MailField);
