import React from "react";
import SelectField from 'material-ui/SelectField';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import MenuItem from 'material-ui/MenuItem';

const styles = theme => ({
});

class RelationSelect extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<SelectField
				id="relation"
				floatingLabelText="誰的親友"
				value={this.props.value}
				errorText={this.props.error}
				onChange={this.props.onChange}
				margin="normal"
				style={{width: '100%'}}
				floatingLabelStyle={{color: '#39454b'}}
				floatingLabelFocusStyle={{color: '#00bcd4'}}
				underlineStyle={{borderColor: '#39454b'}}
				underlineFocusStyle={{borderColor: '#00bcd4'}}
			>
				<MenuItem
					value={1}
					primaryText="彥彬親友"
				/>

				<MenuItem
					value={2}
					primaryText="愛名親友"
				/>
			</SelectField>
		)
	}
}

RelationSelect.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RelationSelect);
