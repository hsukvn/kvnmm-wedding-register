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
		const  styleFieldSingle = window.matchMedia('only screen and (max-width: 480px)').matches ? {} : {width: '522px'};

		return (
			<TextField
				onChange={this.props.onChange}
				value={this.props.value}
				name="address"
				floatingLabelText="地址"
				style={styleFieldSingle}
			/>
		)
	}
}

AddressField.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressField);
