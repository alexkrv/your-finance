import { CUR_RUB } from 'constants/default-values';

import React, { useMemo, useCallback } from 'react';
import { AreaClosed, Bar } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { GridColumns } from '@visx/grid';
import { scaleTime, scaleLinear } from '@visx/scale';
import { withTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { max, extent, bisector } from 'd3-array';

import AreaPointer from './AreaPointer/AreaPointer';

const background = '#3b6978';
const background2 = '#204051';
const accentColor = '#edffea';

const tooltipStyles = {
	...defaultStyles,
	background,
	border: '1px solid white',
	color: 'white',
};

// accessors
const getDate = d => d.date;
const getDataValue = d => d.valueInRub;
const bisectDate = bisector(getDate).left;
const AreaGraph = ({
	data,
	width,
	height,
	margin = { top: 0, right: 0, bottom: 0, left: 0 },
	showTooltip,
	hideTooltip,
	tooltipData,
	tooltipTop = 0,
	tooltipLeft = 0,
}) => {
	// bounds
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	// scales
	const dateScale = useMemo(
		() =>
			scaleTime({
				range: [margin.left, innerWidth + margin.left],
				domain: extent(data, getDate),
			}),
		[innerWidth, margin.left, data],
	);
	const dataValueScale = useMemo(
		() =>
			scaleLinear({
				range: [innerHeight + margin.top, margin.top],
				domain: [0, (max(data, getDataValue) || 0) + innerHeight / 3],
				nice: true,
			}),
		[margin.top, innerHeight, data],
	);

	// tooltip handler
	const handleTooltip = useCallback(
		(event) => {
			// debugger;
			const { x } = localPoint(event) || { x: 0 };
			const x0 = dateScale.invert(x);
			const index = bisectDate(data, x0, 1);
			const d0 = data[index - 1];
			const d1 = data[index];
			let d = d0;

			if (d1 && getDate(d1)) {
				d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
			}

			showTooltip({
				tooltipData: d,
				tooltipLeft: x,
				tooltipTop: dataValueScale(getDataValue(d)),
			});
		},
		[showTooltip, dataValueScale, dateScale, data],
	);

	if (width < 10) {
		return null;
	}

	return (
		<>
			<svg width={width} height={height}>
				<rect
					x={0}
					y={0}
					width={width}
					height={height}
					fill="url(#area-background-gradient)"
					rx={14}
				/>
				<LinearGradient id="area-background-gradient" from={background} to={background2} />
				<LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1} />
				<GridColumns
					top={margin.top}
					scale={dateScale}
					height={innerHeight}
					strokeDasharray="1,3"
					stroke={accentColor}
					strokeOpacity={0.2}
					pointerEvents="none"
				/>
				<AreaClosed
					data={data}
					x={(d) => dateScale(getDate(d)) ?? 0}
					y={(d) => dataValueScale(getDataValue(d)) ?? 0}
					yScale={dataValueScale}
					strokeWidth={1}
					stroke="url(#area-gradient)"
					fill="url(#area-gradient)"
					curve={curveMonotoneX}
				/>
				<Bar
					x={margin.left}
					y={margin.top}
					width={innerWidth}
					height={innerHeight}
					fill="transparent"
					rx={14}
					onTouchStart={handleTooltip}
					onTouchMove={handleTooltip}
					onMouseMove={handleTooltip}
					onMouseLeave={hideTooltip}
				/>
				{tooltipData &&
					<AreaPointer circleConfig={{ cx: tooltipLeft, cy: tooltipTop + 1 }}
								 lineTo={{ x: tooltipLeft, y: innerHeight + margin.top }}
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

export default withTooltip(AreaGraph);