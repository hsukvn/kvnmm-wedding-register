import React from "react";
import SelectField from 'material-ui/SelectField';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = theme => ({
});

class AttendSelect extends React.Component {

	render() {
		const { classes } = this.props;

		return (
			<RadioButtonGroup
				name="attend"
				defaultSelected="wedding_and_ceremony"
				style={{width: '100%'}}
			>
				<RadioButton
					value="wedding_and_ceremony"
					label="我要來！我還想參加儀式"
					style={{marginTop: 24, marginBottom: 8, fontSize: '16px', textAlign: 'left'}}
				/>
				<RadioButton
					value="wedding_only"
					label="我要來！但儀式放棄"
					style={{marginBottom: 8, fontSize: '16px', textAlign: 'left'}}
				/>
				<RadioButton
					value="not_coming"
					label="很抱歉無法前來"
					style={{fontSize: '16px', textAlign: 'left'}}
				/>
			</RadioButtonGroup>
		)
	}
}

AttendSelect.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AttendSelect);
