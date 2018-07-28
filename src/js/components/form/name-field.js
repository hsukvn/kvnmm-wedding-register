import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
});

class NameField extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<TextField
				id="name"
				floatingLabelText="姓名"
				errorText={this.props.error}
				value={this.props.value}
				onChange={this.props.onChange}
				margin="normal"
				style={{width: '100%'}}
			/>
		);
	}
}

NameField.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NameField);
