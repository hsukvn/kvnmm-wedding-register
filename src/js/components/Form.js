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

	handleSelectAction(e, index, value) {
		this.props.changeState('attend', value);
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
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<div>
					<TextField
						floatingLabelText="姓名"
						onChange={this.handleChange.bind(this)}
						value={this.props.name}
						name="name"
						style={{marginRight: '5px'}}
						inputStyle={{marginTop: '6px'}}
					/>

					<SelectField
						floatingLabelText="誰的親友"
						value={this.props.relation}
						onChange={this.handleSelectRelation.bind(this)}
						style={{marginLeft: '5px'}}
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
						style={{width: '522px'}}
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

				<div>
					<TextField
						onChange={this.handleChange.bind(this)}
						value={this.props.phone}
						name="phone"
						floatingLabelText="電話"
						type="tel"
						style={{marginRight: '5px'}}
					/>

					<TextField
						onChange={this.handleChange.bind(this)}
						value={this.props.email}
						name="email"
						floatingLabelText="E-Mail"
						type="email"
						style={{marginLeft: '5px'}}
					/>
				</div>

				<div>
					<TextField
						onChange={this.handleChange.bind(this)}
						value={this.props.address}
						name="address"
						floatingLabelText="地址"
						style={{width: '522px'}}
					/>
				</div>

				<div>
					<RaisedButton
						type="submit"
						label="Submit"
						primary
						style={{marginTop: '10px'}}
					/>
				</div>
			</form>
		);
	}
}
