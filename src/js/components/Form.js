import React from "react";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

export default class Form extends React.Component {
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

	handleSelectAction(e, index, value) {
		this.props.changeState('attend', value);
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

	handleSubmit(e) {
		e.preventDefault();
		// call api
		$.ajax({
			url: '/api/attendee',
			dataType: 'json',
			type: 'POST',
			data: {
				name: this.props.name,
				relation: this.props.relation,
				members: this.props.members,
				attend: (this.props.attend === 'wedding_and_ceremony' || this.props.attend === 'wedding_only') ,
				ceremony_attend: (this.props.attend === 'wedding_and_ceremony'),
				email: this.props.email,
				phone: this.props.phone,
				address: this.props.address,
			},
			success: function(data) {
				// FIXME: do handler
				console.log(data);
			}.bind(this),
			error: function(xhr, status, err) {
				// FIXME: do handler
				console.log(err);
			}.bind(this)
		})
	}

	render() {
		let styleFieldSingle = window.matchMedia('only screen and (max-width: 480px)').matches ? {} : {width: '522px'};
		let styleButton = {marginTop: '25px'};

		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<div className="row">
					<TextField
						floatingLabelText="姓名"
						onChange={this.handleNameChange.bind(this)}
						value={this.props.name}
						name="name"
						className="field half first"
					/>

					<SelectField
						floatingLabelText="誰的親友"
						value={this.props.relation}
						onChange={this.handleSelectRelation.bind(this)}
						className="field half"
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
				</div>

				<div>
					<SelectField
						floatingLabelText="來嗎？"
						value={this.props.attend}
						onChange={this.handleSelectAction.bind(this)}
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
				</div>

				{this.props.members.map((member, idx) => (
					<div className="row">
						<div className="column first">
							<TextField
								floatingLabelText="姓名"
								value={member.name}
								onChange={this.handleMemberNameChange(idx).bind(this)}
								name={'name_' + idx}
								key={'name_' + idx}
							/>
						</div>

						<div className="column second">
							<Checkbox
								label="吃素"
								checked={member.vegetarian}
								onCheck={this.handleMemberVegetarianCheck(idx).bind(this)}
								name={'vegetarian_' + idx}
								key={'vegetarian_' + idx}
							/>

							<Checkbox
								label="寶寶椅"
								checked={member.babychair}
								onCheck={this.handleMemberBabySitCheck(idx).bind(this)}
								name={'babychair_' + idx}
								key={'babychair_' + idx}
							/>
						</div>

						<div className="column third">
						{idx === 0 ? (
							<FloatingActionButton
								mini={true}
								onClick={this.handleMemberAdd.bind(this)}
							>
								<ContentAdd />
							</FloatingActionButton>
						) : (
							<FloatingActionButton
								mini={true}
								onClick={this.handleMemberRemove(idx).bind(this)}
							>
								<ContentRemove />
							</FloatingActionButton>
						)}
						</div>
					</div>
				))}

				<div className="row">
					<TextField
						onChange={this.handleChange.bind(this)}
						value={this.props.phone}
						name="phone"
						floatingLabelText="電話"
						type="tel"
						className="field half first"
					/>

					<TextField
						onChange={this.handleChange.bind(this)}
						value={this.props.email}
						name="email"
						floatingLabelText="E-Mail"
						type="email"
						className="field half"
					/>
				</div>

				<div>
					<TextField
						onChange={this.handleChange.bind(this)}
						value={this.props.address}
						name="address"
						floatingLabelText="地址"
						style={styleFieldSingle}
					/>
				</div>

				<div>
					<RaisedButton
						type="submit"
						label="Submit"
						primary
						style={styleButton}
					/>
				</div>
			</form>
		);
	}
}
