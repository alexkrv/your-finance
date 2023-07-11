import React from 'react';
import { Space } from 'antd';

import { useGetBanksListQuery } from '@root/api';

import { BankItem } from '../BankItem/BankItem';
import { BankItemType } from '../BankItemType';

export const BankItemsWrapper = () => {
	const { data, } = useGetBanksListQuery();

	return (
		<Space size='small' align='start' wrap>
			{ data?.map((bank: BankItemType) =>
				<BankItem
					key={bank._id}
					bank={bank}
				/>)}
		</Space>
	);
};