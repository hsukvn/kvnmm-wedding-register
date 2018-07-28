import React from "react";
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import MenuItem from 'material-ui/MenuItem';

const styles = theme => ({
});

class AddressField extends React.Component {

	render() {
		const { classes } = this.props;

		return (
			<TextField
				id="address"
				onChange={this.props.onChange}
				value={this.props.value}
				errorText={this.props.error}
				name="address"
				floatingLabelText="地址"
				style={{width: '100%'}}
			/>
		)
	}
}

AddressField.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressField);
