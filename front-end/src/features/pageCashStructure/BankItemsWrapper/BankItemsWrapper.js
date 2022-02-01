import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';

import BankItem from '../BankItem/BankItem';
import { getBankItems, } from '../PageCashStructureSlice';

const BankItemsWrapper = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBankItems());
	}, [dispatch]);

	const { bankItems, } = useSelector(state => state.cashCategories);

	return (
		<Space size='small' align='start' wrap>
			{Object.keys(bankItems).map(bankId =>
				<BankItem
					key={bankId}
					bankId={bankId}
				/>)}
		</Space>
	);
};

export default BankItemsWrapper;