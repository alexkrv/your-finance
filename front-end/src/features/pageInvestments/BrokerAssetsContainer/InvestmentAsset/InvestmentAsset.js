import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Space, } from 'antd';

import { FinancialValue } from '../../../../components/FinancialValue/FinancialValue';
import ButtonDeleteItem from '../../../../components/ButtonDeleteItem/ButtonDeleteItem';
import ButtonAddItem from '../../../../components/ButtonAddItem/ButtonAddItem';

import styles from './InvestmentAsset.module.scss';

const InvestmentAsset = ({ brokerId, asset, buttonAddAssetText, addAssetForm }) => {
	const { t, } = useTranslation();
	const confirm = () => {/*TODO*/};
	const assetKeys = Object.keys(asset);

	return (
		<div className={styles.container}>
			{assetKeys.map( assetKey => <Space size="middle" key={assetKey}>
				<Space size="small">
					<div className={styles.assetInfo}>
						{assetKey}
					</div>
					<ButtonDeleteItem
						confirmationPlacement="right"
						confirmationOkText={t('common.remove')}
						confirmationCancelText={t('common.keep')}
						afterActionText={`${assetKey} ${t('common.removed')}`}
						onConfirm={confirm}
						title={t('common.sureToRemove')}
						iconClassName={styles.deleteIcon}
					/>
				</Space>
				<Space size="small" className={styles.assetAmount}>
					<FinancialValue value={asset[assetKey].amount} />
				</Space>
				<Space size="small">
					<FinancialValue currencyId={asset[assetKey].currencyId} value={asset[assetKey].amount * asset[assetKey].pricePerItem}/>
				</Space>
			</Space>)}
			<ButtonAddItem
				size='medium'
				text={buttonAddAssetText}
				addItemFormElement={addAssetForm}
			/>
		</div>
	);
};

InvestmentAsset.propTypes = {
	brokerId: PropTypes.string.isRequired
};

export default InvestmentAsset;