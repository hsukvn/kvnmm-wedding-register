import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from "./form/form";

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
			attend: null,
			email: '',
			phone: '',
			address: '',
			loading: false,
			error: {},
		}
	}

	changeState(key, val) {
		var state = {};
		state[key] = val;
		this.setState(state);
	}

	render() {
		return (
			<MuiThemeProvider>
				<Form 
					changeState={this.changeState.bind(this)}
					name={this.state.name}
					relation={this.state.relation}
					members={this.state.members}
					attend={this.state.attend}
					email={this.state.email}
					phone={this.state.phone}
					address={this.state.address}
					loading={this.state.loading}
				/>
			</MuiThemeProvider>
		);
	}
}
