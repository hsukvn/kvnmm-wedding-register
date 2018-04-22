import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
});

class PhoneField extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<TextField
				name="phone"
				floatingLabelText="電話"
				type="tel"
				value={this.props.value}
				onChange={this.props.onChange}
			/>
		);
	}
}

PhoneField.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhoneField);
