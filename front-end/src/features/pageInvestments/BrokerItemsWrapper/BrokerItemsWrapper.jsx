import React from 'react';
import { Space, Collapse, } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import { useGetBrokersListQuery } from '@root/api';
import { DEFAULT_ZERO } from '@root/constants/default-values';

import BrokerCollapseHeader from '../BrokerCollapseHeader/BrokerCollapseHeader';
import { BrokerAssetsContainer } from '../BrokerAssetsContainer/BrokerAssetsContainer';

import styles from './BrokerItemsWrapper.module.scss';

const BrokerItemsWrapper = () => {
	const { data } = useGetBrokersListQuery();

	return <div className={styles.container}>
		{ data?.length ? <Space size='small' align='start' wrap>
			<Collapse
				ghost
				defaultActiveKey={[data?.[DEFAULT_ZERO]._id]}
				expandIcon={({ isActive }) => <div className={styles.iconContainer}>
					<CaretRightOutlined rotate={isActive ? 90 : 0} className={styles.caret}/>
				</div>}
				className={styles.collapseContainer}
			>
				{ data?.map(broker =>
					<Collapse.Panel
						key={broker._id}
						header={<BrokerCollapseHeader broker={broker}/>}
						className={styles.collapsePanel}
					>
						<BrokerAssetsContainer broker={broker}/>
					</Collapse.Panel>) }
			</Collapse>
		</Space>
			: null}
	</div>;
};

export default BrokerItemsWrapper;
