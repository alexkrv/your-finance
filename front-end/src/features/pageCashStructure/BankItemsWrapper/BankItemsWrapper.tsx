import React from 'react';
import { Space } from 'antd';

import { useGetBanksListQuery } from '@root/api';
import type { BankItemType } from '@root/types';

import { BankItem } from '../BankItem/BankItem';

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