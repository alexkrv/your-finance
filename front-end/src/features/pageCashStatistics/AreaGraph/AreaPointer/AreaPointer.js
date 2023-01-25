import React from 'react';
import PropTypes from 'prop-types';
import { Line } from '@visx/shape';

const accentColorDark = '#75daad';
const AreaPointer = ({ circleConfig, lineFrom, lineTo }) => (
	<g>
		<Line
			from={lineFrom}
			to={lineTo}
			stroke={accentColorDark}
			strokeWidth={2}
			pointerEvents="none"
			strokeDasharray="5,2"
		/>
		<circle
			cx={circleConfig.cx}
			cy={circleConfig.cy + 1}
			r={4}
			fill="black"
			fillOpacity={0.1}
			stroke="black"
			strokeOpacity={0.1}
			strokeWidth={2}
			pointerEvents="none"
		/>
		<circle
			cx={circleConfig.cx}
			cy={circleConfig.cy}
			r={4}
			fill={accentColorDark}
			stroke="white"
			strokeWidth={2}
			pointerEvents="none"
		/>
	</g>
);

AreaPointer.propTypes = {
	circleConfig: PropTypes.shape({
		cx: PropTypes.number,
		cy: PropTypes.number,
	}).isRequired,
	lineFrom: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number,
	}).isRequired,
	lineTo: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number,
	}).isRequired,
};

export default AreaPointer;