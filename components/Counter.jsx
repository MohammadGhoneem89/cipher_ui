import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class Counter extends React.Component {

	constructor(props, context) {
		super(props, context);
	}
	componentDidUpdate() {
		let slaText = this.props.sla + ' days';
		let barColor = this.props.barColor;
		let Size = 110;
		if (this.props.size) {
			Size = this.props.size;
		}
		$(function () {
			$('.chart').easyPieChart({
				barColor: barColor,
				lineWidth: 3.5,
				size: Size,
				easing: 'easeOutBounce',
				onStep: function (from, to, percent) {
					$(this.el).find('.percent').text(slaText);
				}
			});
		});

	}



	componentWillMount() {

	}
	render() {
		var percentage = (this.props.overdue / this.props.sla) * 100;
		if (this.props.size) {
			return (
				<div>
					<div className="chart" data-percent={percentage} style={{ width: this.props.size + "px", height: this.props.size + "px" }}>
						<small><span className="percent" style={{ lineHeight: this.props.size + "px" }}> </span></small>
					</div>
				</div>
			);
		} else
			return (<div></div>);
	}
}
export default Counter;