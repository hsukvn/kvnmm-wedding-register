import React from "react";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

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
				relation: parseInt(this.props.relation),
				members: this.props.members,
				attend: this.props.attend,
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
						hintText="Name"
						onChange={this.handleChange.bind(this)}
						value={this.props.name}
						name="name"
						floatingLabelText="name"
					/>
				</div>

				<div>
					<SelectField
						value={this.props.relation}
						floatingLabelText="跟新人的關係"
						onChange={this.handleSelectRelation.bind(this)}
						autowidth
					>
						<MenuItem
							value="1"
							primaryText="彥彬親友"
						/>

						<MenuItem
							value="2"
							primaryText="愛名親友"
						/>
					</SelectField>
				</div>

				<RaisedButton
					type="submit"
					label="Submit"
					primary
				/>
			</form>
		);
	}
}
