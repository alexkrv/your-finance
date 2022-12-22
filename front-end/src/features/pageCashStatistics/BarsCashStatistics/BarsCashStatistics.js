import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { LinearGradient } from '@visx/gradient';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear, } from '@visx/scale';
import { AxisBottom } from '@visx/axis';
import dayjs from 'dayjs';
import { timeParse, timeFormat } from 'd3-time-format';

const BarsCashStatistics = ({ data, width, height, verticalMargin, className }) => {
	const barsPadding = 0.4;
	const topGap = verticalMargin / 1.5;
	const xMax = width;
	const yMax = height - verticalMargin;
	const xScale = useMemo(
		() =>
			scaleBand({
				range: [0, xMax],
				round: true,
				domain: data.map(record => record.date),
				padding: barsPadding,
			}),
		[xMax, data,],
	);
	const yScale = useMemo(
		() =>
			scaleLinear({
				range: [yMax, 0],
				round: true,
				domain: [0, Math.max(...data.map(record => record.valueInRub))],
			}),
		[yMax, data,],
	);
	const parseDate = timeParse('%d.%m.%Y');
	const format = timeFormat('%b %d');
	const formatDate = date => format(parseDate(dayjs(date).format('DD.MM.YYYY')));
	const getDate = record => record.date;
	const dateScale = scaleBand({
		domain: data.map(getDate),
		padding: barsPadding,
	});
	const valuesScale = scaleLinear({
		domain: [0, Math.max(...data.map(record => record.valueInRub))],
		nice: true,
	});

	dateScale.rangeRound([0, xMax]);
	valuesScale.range([yMax, 0]);

	return (
		<div style={{ position: 'relative' }}>
			<svg width={width} height={height} className={className}>
				<LinearGradient id="chartBg" from='var(--color-baltic-light)' to='var(--color-baltic-dark)' />
				<rect width={width} height={height} fill="url(#chartBg)" rx={14} />
				<Group top={topGap}>
					{data.map(d => {
						const barWidth = xScale.bandwidth();
						const barHeight = yMax - (yScale(d.valueInRub) ?? 0);
						const barX = xScale(d.date);
						const barY = yMax - barHeight;

						return (
							<Bar
								key={d.date}
								x={barX}
								y={barY}
								width={barWidth}
								height={barHeight}
								fill='var(--color-teal-light)'
							/>
						);
					})}
				</Group>
				<AxisBottom
					top={yMax + topGap}
					scale={dateScale}
					tickFormat={formatDate}
					stroke='var(--color-white-semitransparent)'
					tickStroke='var(--color-white-semitransparent)'
					tickLabelProps={() => ({
						fill: 'var(--color-white-semitransparent)',
						fontSize: 12,
						textAnchor: 'middle',
					})}
				/>
			</svg>
		</div>
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
	verticalMargin: PropTypes.number.isRequired,
	className: PropTypes.string
};

export default BarsCashStatistics;