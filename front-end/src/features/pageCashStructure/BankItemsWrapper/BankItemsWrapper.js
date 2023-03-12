import React from 'react';
import { Space } from 'antd';
import { useGetBanksListQuery } from 'api';

import BankItem from '../BankItem/BankItem';

const BankItemsWrapper = () => {
	const { data, } = useGetBanksListQuery();

	return (
		<Space size='small' align='start' wrap>
			{ data?.map(bank =>
				<BankItem
					key={bank._id}
					bank={bank}
				/>)}
		</Space>
	);
};

export default BankItemsWrapper;