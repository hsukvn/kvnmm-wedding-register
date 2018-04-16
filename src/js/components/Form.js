import React from "react";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

export default class Form extends React.Component {
	handleChange(e) {
		this.props.changeState(e.target.name, e.target.value);
	}

	handleSelectRelation(e, index, value) {
		this.props.changeState('relation', value);
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
				attend: (this.props.attend === 'coming'),
				ceremony_attend: this.props.ceremony_attend,
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
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<div>
					<TextField
						floatingLabelText="姓名"
						onChange={this.handleChange.bind(this)}
						value={this.props.name}
						name="name"
						className="field half first"
					/>
				</div>

				<div>
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
					<RadioButtonGroup
						name="attend"
						defaultSelected="coming"
					>
						<RadioButton
							value="coming"
							label="一定來"
						/>

						<RadioButton
							value="not_coming"
							label="不來"
						/>
					</RadioButtonGroup>
				</div>

				<div>
					<Checkbox
						checkedIcon={<ActionFavorite />}
						uncheckedIcon={<ActionFavoriteBorder />}
						label="參加儀式"
					/>
				</div>

				<div>
					<TextField
						onChange={this.handleChange.bind(this)}
						value={this.props.phone}
						name="phone"
						floatingLabelText="電話"
						type="tel"
						className="field half first"
					/>
				</div>

				<div>
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
						className="field"
					/>
				</div>

				<div>
					<RaisedButton
						type="submit"
						label="Submit"
						primary
					/>
				</div>
			</form>
		);
	}
}
