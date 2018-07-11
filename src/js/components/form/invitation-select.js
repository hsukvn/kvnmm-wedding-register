import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = theme => ({
});

class InvitationSelect extends React.Component {

	render() {
		const { classes } = this.props;

		return (
			<div>
				<p style={{textAlign: 'left'}}>想要哪種喜帖呢？</p>
				<RadioButtonGroup
					name="invitation"
					defaultSelected="paper_invitation"
					onChange={this.props.onChange}
					style={{width: '100%'}}
				>
					<RadioButton
						value="paper_invitation"
						label="請給我紙本喜帖"
						style={{fontSize: '16px', textAlign: 'left'}}
					/>
					<RadioButton
						value="mail_invitaion"
						label="給我 email 喜帖就好囉"
						style={{fontSize: '16px', textAlign: 'left'}}
					/>
					<RadioButton
						value="paper_mail_invitation"
						label="我兩個都要！"
						style={{fontSize: '16px', textAlign: 'left'}}
					/>
				</RadioButtonGroup>
			</div>
		)
	}
}

InvitationSelect.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InvitationSelect);
