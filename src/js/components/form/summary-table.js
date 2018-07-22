import React from "react";
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';

const styles = theme => ({
});

class SummaryTable extends React.Component {

	render() {
		const { classes } = this.props;

		return (
			<div>
				<p>
					{this.props.name}				
				<br />
					{(this.props.relation === 1) ? '彥彬的親友' : '愛名的親友'}
				<br />
					{(this.props.attend === 'coming') ? '我要來！' : '很抱歉無法前來' }
				<br />
					{(this.props.invitation === 'paper_invitation') ? '請給我紙本喜帖' : '給我 email 喜帖就好囉' }
				<br />
					{this.props.phone ? this.props.phone : '沒填電話'}
				<br />
					{this.props.email ? this.props.email : '沒填 email'}
				<br />
					{this.props.address ? this.props.address : '沒填地址'}
				<br />
					{this.props.message ? this.props.message : '無話可說'}
				</p>
			</div>
				
		)
	}
}

SummaryTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SummaryTable);
