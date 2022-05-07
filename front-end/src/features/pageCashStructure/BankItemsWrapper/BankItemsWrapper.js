import React from 'react';
import { Space } from 'antd';

import BankItem from '../BankItem/BankItem';
import { useGetBanksListQuery } from '../../../api';

const BankItemsWrapper = () => {
	const { data } = useGetBanksListQuery();

	return (
		<Space size='small' align='start' wrap>
			{ data?.map(bank =>
				<BankItem
					key={bank._id}
					bank={bank}
				/>) || null}
		</Space>
	);
};

export default BankItemsWrapper;