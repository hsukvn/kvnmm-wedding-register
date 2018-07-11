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
					loading={this.state.loading}
				/>
			</MuiThemeProvider>
		);
	}
}
