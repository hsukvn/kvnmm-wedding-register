import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
});

class MsgField extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<TextField
				name="message"
				floatingLabelText="請跟我們說說話"
				onChange={this.props.onChange}
				value={this.props.value}
				style={{width: '100%'}}
				multiLine={true}
				rows={1}
			/>
		);
	}
}

MsgField.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MsgField);
