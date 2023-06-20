import React from 'react';
import Pie from '@visx/shape/lib/shapes/Pie';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { GradientPinkBlue } from '@visx/gradient';
import { animated, useTransition, to } from '@react-spring/web';
import clsx from 'clsx';

import { DEFAULT_ZERO } from '@root/constants/default-values';

import styles from './PieChart.module.scss';

export const PieChart = ({
	width,
	height,
	margin = { top: 20, right: 20, bottom: 20, left: 20 },
	animate = true,
	data,
	className,
	legend
}) => {
	if(!data || !Object.keys(data).length) {
		return null;
	}

	const assetPlacements = Object.keys(data);
	const assets = assetPlacements.map(name => ({
		label: name,
		absoluteValue: Number(data[name]),
	}));
	const absoluteValue = d => d.absoluteValue;
	const total = assetPlacements.reduce((acc, assetName) => acc + data[assetName], DEFAULT_ZERO);
	const getKey = arc => ({
		label: arc.data.label,
		percentValue: (arc.data.absoluteValue * 100 / total).toFixed(2)
	});
	const getAssetColor = scaleOrdinal({
		domain: assetPlacements,
		range: assets.map(asset => `rgba(255, 255, 255, ${(absoluteValue(asset) / total).toFixed(2)})`)
	});
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const radius = Math.min(innerWidth, innerHeight) / 2;
	const centerY = innerHeight / 2;
	const centerX = innerWidth / 2;
	const donutThickness = 70;

	return (
		<div className={clsx(styles.container, className)}>
			<svg width={width} height={height}>
				<GradientPinkBlue id="visx-pie-gradient" />
				<rect rx={14} width={width} height={height} fill="url('#visx-pie-gradient')" />
				<Group top={centerY + margin.top} left={centerX + margin.left}>
					<Pie
						data={assets}
						pieValue={absoluteValue}
						outerRadius={radius}
						innerRadius={radius - donutThickness}
						cornerRadius={3}
						padAngle={0.005}
					>
						{(pie) => (
							<AnimatedPie
								{...pie}
								animate={animate}
								getKey={getKey}
								getColor={(arc) => getAssetColor(arc.data.label)}
							/>
						)}
					</Pie>
				</Group>
			</svg>
			{legend && <div className={styles.legend}>
				{legend}
			</div>}
		</div>
	);
};

const fromLeaveTransition = ({ endAngle }) => ({
	// enter from 360° if end angle is > 180°
	startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
	endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
	opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }) => ({
	startAngle,
	endAngle,
	opacity: 1,
});
function AnimatedPie({
	animate,
	arcs,
	path,
	getKey,
	getColor,
}) {
	const transitions = useTransition(arcs, {
		from: animate ? fromLeaveTransition : enterUpdateTransition,
		enter: enterUpdateTransition,
		update: enterUpdateTransition,
		leave: animate ? fromLeaveTransition : enterUpdateTransition,
		keys: arc => getKey(arc).label,
	});

	return transitions((props, arc, { key }) => {
		const [centroidX, centroidY] = path.centroid(arc);
		const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
		const { label, percentValue } = getKey(arc);

		return (
			<g key={key}>
				<animated.path
					// compute interpolated path d attribute from intermediate angle values
					d={to([props.startAngle, props.endAngle], (startAngle, endAngle) =>
						path({
							...arc,
							startAngle,
							endAngle,
						}),
					)}
					fill={getColor(arc)}
				/>
				{hasSpaceForLabel && (
					<animated.g style={{ opacity: props.opacity }}>
						<text
							fill="var(--text-primary)"
							x={centroidX}
							y={centroidY}
							dy=".33em"
							fontSize={14}
							textAnchor="middle"
							pointerEvents="none"
						>
							{label}
						</text>
						<text
							fill="var(--text-primary)"
							x={centroidX}
							y={centroidY + 14}
							dy=".33em"
							fontSize={10}
							textAnchor="middle"
							pointerEvents="none"
						>
							{`${percentValue}%`}
						</text>
					</animated.g>
				)}
			</g>
		);
	});
}
