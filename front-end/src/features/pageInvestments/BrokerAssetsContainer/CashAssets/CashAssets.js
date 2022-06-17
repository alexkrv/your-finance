import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { FinancialValue } from 'components/FinancialValue/FinancialValue';
import ButtonDeleteItem from 'components/ButtonDeleteItem/ButtonDeleteItem';
import ButtonAddItem from 'components/ButtonAddItem/ButtonAddItem';
import { useRemoveBrokerAssetMutation } from 'api';

import AssetName from '../InvestmentAsset/AssetName/AssetName';

import styles from './CashAssets.module.scss';

import FormAddCashAsset from './FormAddCashAsset/FormAddCashAsset';

const CashAssets = ({ broker }) => {
	const { t } = useTranslation();
	const [removeBrokerAsset] = useRemoveBrokerAssetMutation();
	const confirmCashRemoving = currencyId => removeBrokerAsset({ brokerId: broker._id, name: currencyId, type: 'cash' });
	const cashKeys = broker?.assets?.cash ? Object.keys(broker?.assets?.cash) : [];

	return (
		<Space direction='vertical'>
			<Space size='large' align='start'>
				<AssetName assetName={t('brokerItem.cash')}/>
				<Space wrap>
					{cashKeys.map(cashKey => <Space key={cashKey} size='small' className={styles.cashAsset}>
						<FinancialValue value={broker.assets.cash[cashKey]} currencyId={cashKey}/>
						<ButtonDeleteItem
							confirmationPlacement="right"
							confirmationCancelText={t('common.keep')}
							confirmationOkText={t('common.remove')}
							onConfirm={() => confirmCashRemoving(cashKey)}
							title={t('common.sureToRemove')}
							afterActionText={t('brokerItem.cashRemoved').replace(' ', ` ${cashKey} `)}
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
	broker: PropTypes.object.isRequired// TODO shape
};

export default CashAssets;