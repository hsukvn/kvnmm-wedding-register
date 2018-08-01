import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import NameField from './name-field';
import Grid from 'material-ui-next/Grid';
import { withStyles } from 'material-ui-next/styles';
import PropTypes from 'prop-types';
import RelationSelect from './relation-select';
import AttendSelect from './attend-select';
import InvitationSelect from './invitation-select';
import AddressField from './address-field';
import PhoneField from './phone-field';
import MailField from './mail-field';
import MsgField from './msg-field';
import VerifyDialog from './verify-dialog';
import SubmitDialog from './submit-dialog';
import MemberCard from './member-card';

const styles = theme => ({
	root: {
		flexGrow: 1,
		textAlign: window.matchMedia('only screen and (max-width: 480px)').matches ? 'center' : 'left'
	}
});

class Form extends React.Component {
	handleChange(e) {
		this.props.changeState(e.target.name, e.target.value);
	}

	handleNameChange(e) {
		const newMembers = this.props.members.map((m, i) => {
			if (0 !== i) {
				return m;
			}
			return { ...m, name: e.target.value };
		});

		this.props.changeState('name', e.target.value);
		this.props.changeState('members', newMembers);
	}

	handleSelectRelation(e, index, value) {
		this.props.changeState('relation', value);
	}

	handleAttendSelectAction(e, value) {
		this.props.changeState('attend', value);
	}

	handleInvitationSelectAction(e, value) {
		this.props.changeState('invitation', value);
	}

	validate() {
		let error_message = {};

		if (!this.props.name) {
			error_message.name = '必須填寫姓名喔!';
		}

		if (!this.props.relation) {
			error_message.relation = '誰的親友請選擇!';
		}

		if (!this.props.email) {
			error_message.email = '必須填寫 email 喔!';
		}

		if (!this.props.phone) {
			error_message.phone = '必須填寫電話喔!';
		}

		if (!this.props.address && this.props.invitation === 'paper_invitation') {
			error_message.address = '必須填寫地址喔!';
		}

		this.props.changeState('error_message', error_message, () => {
			if (error_message.name) {
				document.getElementById('name').focus().select();
			} else if (error_message.relation) {
				//FIXME: should focus on relation selection field
			} else if (error_message.phone) {
				document.getElementById('phone').focus().select();
			} else if (error_message.email) {
				document.getElementById('email').focus().select();
			} else if (error_message.address) {
				document.getElementById('address').focus().select();
			}
		});

		return $.isEmptyObject(error_message);
	}

	getMembers() {
		let members = [];

		this.props.members.forEach(function(member, idx) {
			if (member.name) {
				members.push(member);
			}
		});

		return members;
	}

	openDialog(e) {
		if (this.validate()) {
			this.props.changeState('dialog', true);
		}
	}

	render() {
		let styleFieldSingle = window.matchMedia('only screen and (max-width: 480px)').matches ? {} : {width: '522px'};
		let styleButton = {marginTop: '25px', lineHeight: '0px'};
		const { classes } = this.props;

		return (
			<form>
				<Grid className={classes.root}>
					<Grid container justify="center" direction="row" spacing={16}>
						<Grid item xs={12} sm={6}>
							<NameField
								value={this.props.name}
								error={this.props.error_message.name || ''}
								onChange={this.handleNameChange.bind(this)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<RelationSelect
								value={this.props.relation}
								error={this.props.error_message.relation || ''}
								onChange={this.handleSelectRelation.bind(this)}
							/>
						</Grid>
					</Grid>

					<Grid container justify="center" direction="row">
						<Grid item xs={12} sm={12}>
							<AttendSelect
								value={this.props.attend}
								onChange={this.handleAttendSelectAction.bind(this)}
							/>
						</Grid>
					</Grid>

					<Grid container justify="center" direction="row">
						<Grid item xs={12} sm={12}>
							<InvitationSelect
								value={this.props.invitation}
								onChange={this.handleInvitationSelectAction.bind(this)}
							/>
						</Grid>
					</Grid>

					<Grid container justify="center" direction="row" spacing={16}>
						<Grid item xs={12} sm={6}>
							<PhoneField
								value={this.props.phone}
								error={this.props.error_message.phone || ''}
								onChange={this.handleChange.bind(this)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<MailField
								onChange={this.handleChange.bind(this)}
								error={this.props.error_message.email || ''}
								value={this.props.email}
							/>
						</Grid>
					</Grid>

					<Grid container justify="center" direction="row">
						<Grid item xs={12} sm={12}>
							<AddressField
								onChange={this.handleChange.bind(this)}
								error={this.props.error_message.address || ''}
								value={this.props.address}
							/>
						</Grid>
					</Grid>

					{this.props.attend === 'coming' ?
						<MemberCard
							members={this.props.members}
							changeState={this.props.changeState.bind(this)}
						/>
						: <div />
					}

					<Grid container justify="center" direction="row">
						<Grid item xs={12} sm={12}>
							<MsgField
								onChange={this.handleChange.bind(this)}
								value={this.props.message}
							/>
						</Grid>
					</Grid>

					<Grid container justify="center" direction="row">
						<RaisedButton
							label="填完囉"
							primary
							style={styleButton}
							onClick={this.openDialog.bind(this)}
						/>
						<VerifyDialog
							changeState={this.props.changeState.bind(this)}
							name={this.props.name}
							relation={this.props.relation}
							members={this.getMembers()}
							attend={this.props.attend}
							invitation={this.props.invitation}
							email={this.props.email}
							phone={this.props.phone}
							address={this.props.address}
							message={this.props.message}
							dialog={this.props.dialog}
						/>
						<SubmitDialog
							changeState={this.props.changeState.bind(this)}
							attend={this.props.attend}
							submit_dialog={this.props.submit_dialog}
							submit_success={this.props.submit_success}
						/>
					</Grid>
				</Grid>
			</form>
		);
	}
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
