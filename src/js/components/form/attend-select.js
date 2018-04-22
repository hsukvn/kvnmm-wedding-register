import React from "react";
import SelectField from 'material-ui/SelectField';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import MenuItem from 'material-ui/MenuItem';

const styles = theme => ({
});

class AttendSelect extends React.Component {

	render() {
		const { classes } = this.props;
		const  styleFieldSingle = window.matchMedia('only screen and (max-width: 480px)').matches ? {} : {width: '522px'};

		return (
			<SelectField
				floatingLabelText="來嗎？"
				value={this.props.value}
				onChange={this.props.onChange}
				style={styleFieldSingle}
			>
				<MenuItem
					value="wedding_and_ceremony"
					primaryText="我要來！我還想參加儀式"
				/>

				<MenuItem
					value="wedding_only"
					primaryText="我要來！但儀式放棄"
				/>

				<MenuItem
					value="not_coming"
					primaryText="很抱歉無法前來"
				/>
			</SelectField>
		)
	}
}

AttendSelect.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AttendSelect);
