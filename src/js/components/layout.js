import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Form from "./form/form";

const muiTheme = getMuiTheme({
	fontFamily: 'Noto Sans TC',
});

export default class Layout extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			relation: null,
			members: [{
				name: '',
				vegetarian: false,
				babychair: false,
			}],
			attend: 'coming',
			invitation: 'paper_invitation',
			email: '',
			phone: '',
			address: '',
			message: '',
			dialog: false,
			submit_dialog: false,
			submit_success: false,
			error_message: {},
		}
	}

	changeState(key, val, callback) {
		var state = {};
		state[key] = val;
		this.setState(state, callback);
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<Form 
					changeState={this.changeState.bind(this)}
					name={this.state.name}
					relation={this.state.relation}
					members={this.state.members}
					attend={this.state.attend}
					invitation={this.state.invitation}
					email={this.state.email}
					phone={this.state.phone}
					address={this.state.address}
					message={this.state.message}
					dialog={this.state.dialog}
					submit_dialog={this.state.submit_dialog}
					submit_success={this.state.submit_success}
					error_message={this.state.error_message}
				/>
			</MuiThemeProvider>
		);
	}
}
