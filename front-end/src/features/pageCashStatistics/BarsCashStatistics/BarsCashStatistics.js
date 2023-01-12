import React from 'react';
import PropTypes from 'prop-types';
import { GridRows, GridColumns } from '@visx/grid';
import { LinearGradient } from '@visx/gradient';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import dayjs from 'dayjs';

const BarsCashStatistics = ({
	data,
	width,
	height,
	margin = { top: 40, right: 30, bottom: 50, left: 80 },
	className
}) => {
	if(!data?.length) {
		return null;
	}

	const xMax = width - margin.left - margin.right;
	const yMax = height - margin.top - margin.bottom;
	const strokeColor = 'var(--color-white-semitransparent)';
	const formatDate = index => {
		return data[index]?.date ? dayjs(data[index].date).format('DD.MM.YYYY') : '';
	};
	const timeScale = scaleLinear({
		domain: [0, data.length],
		range: [0, xMax],
		nice: true,
	});
	const valuesScale = scaleLinear({
		domain: [0, Math.max(...data.map(record => record.valueInRub))],
		range: [yMax , 0],
		nice: true,
	});

	return (
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
						textAnchor: 'middle', })}
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
					const barWidth = 40;
					const barHeight = yMax - (valuesScale(d.valueInRub) ?? 0);
					const barX = timeScale(index) - barWidth/2;
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
		</svg>
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

export default BarsCashStatistics;