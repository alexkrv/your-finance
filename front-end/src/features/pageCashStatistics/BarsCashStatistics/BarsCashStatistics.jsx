import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { GridRows, GridColumns } from '@visx/grid';
import { LinearGradient } from '@visx/gradient';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import dayjs from 'dayjs';
import { withTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';

import { CUR_RUB, DEFAULT_EMPTY_STRING } from '@root/constants/default-values';
import AreaPointer from '../AreaGraph/AreaPointer/AreaPointer';

const background = '#3b6978';
const tooltipStyles = {
	...defaultStyles,
	background,
	border: '1px solid white',
	color: 'white',
};
const getDataValue = d => d.valueInRub;
const BarsCashStatistics = ({
	data,
	width,
	height,
	margin = { top: 40, right: 30, bottom: 50, left: 80 },
	className,
	showTooltip,
	hideTooltip,
	tooltipData,
	tooltipTop = 0,
	tooltipLeft = 0,
}) => {
	const xMax = width - margin.left - margin.right;
	const yMax = height - margin.top - margin.bottom;
	const strokeColor = 'var(--color-white-semitransparent)';
	const formatDate = index => {
		return data[index]?.date ? dayjs(data[index].date).format('MM.YY') : DEFAULT_EMPTY_STRING;
	};
	const BAR_WIDTH = Math.ceil(data.length > 10 ? xMax/(1.4*data.length) : 20);
	const timeScale = scaleLinear({
		domain: [0, data.length],
		range: [BAR_WIDTH/2, xMax],
		nice: true,
	});
	const valuesScale = scaleLinear({
		domain: [0, Math.max(...data.map(record => record.valueInRub))],
		range: [yMax , 0],
		nice: true,
	});
	const handleTooltip = useCallback(
		(event) => {
			const x = Math.floor(parseInt(event.target.getAttribute('x'), 10) + BAR_WIDTH/2);
			const x0 = Math.ceil(timeScale.invert(x));
			const d = data[x0];

			showTooltip({
				tooltipData: d,
				tooltipLeft: x + margin.left,
				tooltipTop: valuesScale(getDataValue(d)) + margin.top,
			});
		},
		[showTooltip, valuesScale, timeScale, data, margin, BAR_WIDTH],
	);

	return (
		<>
			<svg width={width} height={height} className={className}>
				<LinearGradient id="chartBg" from='var(--color-baltic-light)' to='var(--color-baltic-dark)' />
				<rect width={width} height={height} fill="url(#chartBg)" rx={14} />
				<Group left={margin.left} top={margin.top}>
					<GridRows scale={valuesScale} width={xMax} height={yMax} stroke={strokeColor} />
					<GridColumns scale={timeScale} width={xMax} height={yMax} stroke={strokeColor} />
					<AxisBottom
						top={yMax}
						scale={timeScale}
						numTicks={data.length}
						tickFormat={formatDate}
						stroke={strokeColor}
						tickStroke={strokeColor}
						tickLabelProps={() => ({
							fill: strokeColor,
							textAnchor: 'middle',
							fontSize: '10px'
						})}
					/>
					<AxisLeft
						scale={valuesScale}
						stroke={strokeColor}
						tickStroke={strokeColor}
						tickLabelProps={() => ({
							textAnchor: 'end',
							fill: strokeColor,
						})}
					/>
					{data.map((d, index) => {
						const barHeight = yMax - (valuesScale(d.valueInRub) ?? 0);
						const barX = timeScale(index) - BAR_WIDTH/2;
						const barY = yMax - barHeight;

						return (
							<Bar
								key={d.date}
								x={barX}
								y={barY}
								width={BAR_WIDTH}
								height={barHeight}
								fill='var(--color-teal-light)'
								onMouseEnter={handleTooltip}
								onMouseLeave={hideTooltip}
							/>
						);
					})}
				</Group>
				{tooltipData &&
					<AreaPointer circleConfig={{ cx: tooltipLeft, cy: tooltipTop }}
							 lineTo={{ x: tooltipLeft, y: yMax + margin.top }}
							 lineFrom={{ x: tooltipLeft, y: margin.top }}/>
				}

			</svg>
			{tooltipData && (
				<TooltipWithBounds
					key={Math.random()}
					top={tooltipTop}
					left={tooltipLeft}
					style={tooltipStyles}
				>
					{`${getDataValue(tooltipData).toFixed(2)}${CUR_RUB}`}
				</TooltipWithBounds>
			)}
		</>
	);
};

BarsCashStatistics.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		currencyId: PropTypes.string.isRequired,
		date: PropTypes.number.isRequired,
		description: PropTypes.string.isRequired,
		difference: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
		valueInRub: PropTypes.number.isRequired,
		valueInUsd: PropTypes.number.isRequired,
	})).isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	className: PropTypes.string
};

export default withTooltip(BarsCashStatistics);