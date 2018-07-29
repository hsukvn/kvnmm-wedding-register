import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Grid from 'material-ui-next/Grid';
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {
	Card,
	CardHeader,
	CardText
} from 'material-ui/Card';
import NameField from './name-field';

const styles = theme => ({
	fontFamily: 'Noto Sans TC',
});

class MemberCard extends React.Component {
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
		let newMembers = this.props.members;
		newMembers.splice(idx, 1);
		this.props.changeState('members', newMembers);
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

	render() {
		const { classes } = this.props;

		return (
			<Card style={{'marginTop': '20px', 'background': '#f5f6f7'}}>
				<CardHeader
					title="葷素？寶寶椅？攜伴？"
					subtitle="所有參加成員（含寶寶）都要填寫呦!"
					style={{
						'marginBottom': '-50px',
						'paddingRight': '0px',
						'fontWeight': 'inherit',
					}}
					titleStyle={{
						'textAlign': 'left',
						'fontSize': 'inherit',
					}}
					subtitleStyle={{
						'textAlign': 'left',
					}}
					subtitleColor="#39454b"
					className="cardspan"
	
				/>
				<CardText>
					{this.props.members.map((member, idx) => (
						<Grid container key={idx} justify="center" direction="row" alignItems="flex-end" spacing={8}>
							<Grid item xs={12} sm={4}>
								<NameField
									value={member.name}
									onChange={this.handleMemberNameChange(idx).bind(this)}
									name={'name_' + idx}
									key={'name_' + idx}
								/>
							</Grid>
							<Grid item xs={5} sm={3}>
								<Checkbox
									label="吃素"
									checked={member.vegetarian}
									onCheck={this.handleMemberVegetarianCheck(idx).bind(this)}
									style={{'textAlign': 'left', 'left': '10px'}}
									name={'vegetarian_' + idx}
									key={'vegetarian_' + idx}
									color="primary"
								/>
							</Grid>
							<Grid item xs={5} sm={3}>
								<Checkbox
									label="寶寶椅"
									checked={member.babychair}
									onCheck={this.handleMemberBabySitCheck(idx).bind(this)}
									style={{'textAlign': 'left'}}
									name={'babychair_' + idx}
									key={'babychair_' + idx}
								/>
							</Grid>
							<Grid item xs={2} sm={2}>
								{(idx == 0) ?
									<FloatingActionButton
										mini={true}
										style={{'textAlign': 'center', 'marginRight': 20}}
										onClick={this.handleMemberAdd.bind(this)}
									>
										<ContentAdd />
									</FloatingActionButton>
								:
									<FloatingActionButton
										mini={true}
										secondary={true}
										style={{'textAlign': 'center', 'marginRight': 20}}
										onClick={this.handleMemberRemove(idx).bind(this)}
									>
										<ContentRemove />
									</FloatingActionButton>
								}
							</Grid>
						</Grid>
					))}
				</CardText>
				<CardText>
					由於新郎新娘希望大家都能夠美美的
					請務必穿著正裝出席！
					（西裝襯衫／淺色禮服洋裝）
				</CardText>
			</Card>
		);
	}
}

MemberCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberCard);
