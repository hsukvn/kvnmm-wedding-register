import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
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
import Checkbox from 'material-ui/Checkbox';

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

	handleMemberAdd() {
		this.props.changeState('members',
			this.props.members.concat([{
				name: '',
				vegetarian: false,
				babychair: false,
			}])
		);
	}

	handleMemberRemove = (idx) => () => {
		this.props.changeState('members',
			this.props.members.filter((m, i) => idx !== i)
		);
	}

	handleMemberNameChange = (idx) => (e) => {
		const newMembers = this.props.members.map((m, i) => {
			if (idx !== i) {
				return m;
			}
			return { ...m, name: e.target.value };
		});

		this.props.changeState('members', newMembers);

		if (0 === idx) {
			this.props.changeState('name', e.target.value);
		}
	}

	handleMemberVegetarianCheck = (idx) => (e, checked) => {
		const newMembers = this.props.members.map((m, i) => {
			if (idx !== i) {
				return m;
			}
			return { ...m, vegetarian: checked };
		});

		this.props.changeState('members', newMembers);
	}

	handleMemberBabySitCheck = (idx) => (e, checked) => {
		const newMembers = this.props.members.map((m, i) => {
			if (idx !== i) {
				return m;
			}
			return { ...m, babychair: checked };
		});

		this.props.changeState('members', newMembers);
	}

	openDialog(e) {
		this.props.changeState('dialog', true);
	}

	render() {
		let styleFieldSingle = window.matchMedia('only screen and (max-width: 480px)').matches ? {} : {width: '522px'};
		let styleButton = {marginTop: '25px', lineHeight: '0px'};
		const { classes } = this.props;

		return (
			<form>
				<Grid className={classes.root}>
					<Grid container justify="center" direction="row" spacing={16}>
						<Grid item xs={8} sm={6}>
							<NameField
								value={this.props.name}
								onChange={this.handleNameChange.bind(this)}
							/>
						</Grid>
						<Grid item xs={8} sm={6}>
							<RelationSelect
								value={this.props.relation}
								onChange={this.handleSelectRelation.bind(this)}
							/>
						</Grid>
					</Grid>

					<Grid container justify="center" direction="row" spacing={16}>
						<Grid item xs={8} sm={12}>
							<AttendSelect
								value={this.props.attend}
								onChange={this.handleAttendSelectAction.bind(this)}
							/>
						</Grid>
					</Grid>

					<Grid container justify="center" direction="row" spacing={16}>
						<Grid item xs={8} sm={12}>
							<InvitationSelect
								value={this.props.invitation}
								onChange={this.handleInvitationSelectAction.bind(this)}
							/>
						</Grid>
					</Grid>

					<Grid container justify="center" direction="row" spacing={16}>
						<Grid item xs={8} sm={6}>
							<PhoneField
								value={this.props.phone}
								onChange={this.handleChange.bind(this)}
							/>
						</Grid>
						<Grid item xs={8} sm={6}>
							<MailField
								onChange={this.handleChange.bind(this)}
								value={this.props.email}
							/>
						</Grid>
					</Grid>

					<Grid container justify="center" direction="row" spacing={16}>
						<Grid item xs={8} sm={12}>
							<AddressField
								onChange={this.handleChange.bind(this)}
								value={this.props.address}
							/>
						</Grid>
					</Grid>

{/* FIXME Think better way
					{this.props.members.map((member, idx) => (
						<Grid container justify="center" direction="row" alignItems="flex-end">
							<Grid item xs={8} sm={6}>
								<NameField
									value={member.name}
									onChange={this.handleMemberNameChange(idx).bind(this)}
									name={'name_' + idx}
									key={'name_' + idx}
								/>
							</Grid>
							<Grid item xs={4} sm={3}>
                                <Checkbox
                                    label="吃素"
                                    checked={member.vegetarian}
                                    onCheck={this.handleMemberVegetarianCheck(idx).bind(this)}
                                    name={'vegetarian_' + idx}
                                    key={'vegetarian_' + idx}
                                    color="primary"
                                />
                            </Grid>
							<Grid item xs={4} sm={3}>
                                <Checkbox
                                    label="寶寶椅"
                                    checked={member.babychair}
                                    onCheck={this.handleMemberBabySitCheck(idx).bind(this)}
                                    name={'babychair_' + idx}
                                    key={'babychair_' + idx}
                                />
                            </Grid>
						</Grid>
					))}
*/}
					<Grid container justify="center" direction="row" spacing={16}>
						<Grid item xs={8} sm={12}>
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
							members={this.props.members}
							attend={this.props.attend}
							invitation={this.props.invitation}
							email={this.props.email}
							phone={this.props.phone}
							address={this.props.address}
							message={this.props.message}
							dialog={this.props.dialog}
							loading={this.props.loading}
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
