import React from 'react';
import { Space } from 'antd';

import { useGetBrokersListQuery } from '../../../api';

const BrokerItemsWrapper = () => {
	const { data } = useGetBrokersListQuery();

	return (
		<Space size='small' align='start' wrap>
			{ data?.map(broker =>
				<div
					key={broker._id}
				>{broker.name}</div>) || null}
		</Space>
	);
};

export default BrokerItemsWrapper;