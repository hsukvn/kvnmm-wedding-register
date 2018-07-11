import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = theme => ({
});

class AttendSelect extends React.Component {

	render() {
		const { classes } = this.props;

		return (
			<div>
				<p>是否要參加呢？</p>
				<RadioButtonGroup
					name="attend"
					defaultSelected="coming"
					style={{width: '100%'}}
				>
					<RadioButton
						value="coming"
						label="我要來！"
						style={{marginTop: 24, marginBottom: 8, fontSize: '16px', textAlign: 'left'}}
					/>
					<RadioButton
						value="not_coming"
						label="很抱歉無法前來"
						style={{fontSize: '16px', textAlign: 'left'}}
					/>
				</RadioButtonGroup>
			</div>
		)
	}
}

AttendSelect.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AttendSelect);
