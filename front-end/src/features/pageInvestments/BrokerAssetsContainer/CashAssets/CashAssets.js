import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { FinancialValue } from 'components/FinancialValue/FinancialValue';
import ButtonDeleteItem from 'components/ButtonDeleteItem/ButtonDeleteItem';
import ButtonAddItem from 'components/ButtonAddItem/ButtonAddItem';
import { useRemoveCashAssetMutation } from 'api';

import styles from './CashAssets.module.scss';

import FormAddCashAsset from './FormAddCashAsset/FormAddCashAsset';

const CashAssets = ({ broker }) => {
	const { t } = useTranslation();
	const [removeCashAsset] = useRemoveCashAssetMutation();
	const confirmCashRemoving = currencyId => removeCashAsset({ brokerId: broker._id, name: currencyId, type: 'cash' });

	return (
		<Space direction='vertical'>
			<Space size='large' align='start'>
				<span className={styles.assetCaption}>{t('brokerItem.cash')}:</span>
				<Space wrap>
					{broker?.cash?.map(cash => <Space key={cash._id} size='small' className={styles.cashAsset}>
						<FinancialValue value={cash.amount} currencyId={cash._id}/>
						<ButtonDeleteItem
							confirmationPlacement="right"
							confirmationCancelText={t('common.keep')}
							confirmationOkText={t('common.remove')}
							onConfirm={() => confirmCashRemoving(cash._id)}
							title={t('common.sureToRemove')}
							afterActionText={t('brokerItem.cashRemoved').replace(' ', ` ${cash._id} `)}
						/>
					</Space>)}
				</Space>
			</Space>
			<ButtonAddItem
				size='medium'
				text={t('brokerItem.addBrokerAssetCash')}
				addItemFormElement={<FormAddCashAsset brokerId={broker._id}/>}
			/>
		</Space>
	);
};

CashAssets.propTypes = {

};

export default CashAssets;