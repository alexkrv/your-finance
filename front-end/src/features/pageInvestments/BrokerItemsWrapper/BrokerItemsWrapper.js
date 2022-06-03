import React from 'react';
import { Space, Collapse, } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import { useGetBrokersListQuery } from '../../../api';
import BrokerCollapseHeader from '../BrokerCollapseHeader/BrokerCollapseHeader';

import styles from './BrokerItemsWrapper.module.scss';

const BrokerItemsWrapper = () => {
	const { data } = useGetBrokersListQuery();
	const onChange = key => console.log(key);

	return <>
		{ data?.length ? <Space size='small' align='start' wrap>
			<Collapse
				ghost
				defaultActiveKey={['1']}
				onChange={onChange}
				expandIcon={({ isActive }) => <div className={styles.iconContainer}>
					<CaretRightOutlined rotate={isActive ? 90 : 0} />
				</div>}
				className={styles.collapseContainer}
			>
				{ data?.map(broker =>
					<Collapse.Panel
						key={broker._id}
						header={<BrokerCollapseHeader broker={broker}/>}
					>
						<div>FUTURE CONTENT</div>
					</Collapse.Panel>) }
			</Collapse>
		</Space>
			: null}
	</>;
};

export default BrokerItemsWrapper;