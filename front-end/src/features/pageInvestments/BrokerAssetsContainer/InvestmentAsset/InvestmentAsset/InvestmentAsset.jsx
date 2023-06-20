import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TextStyler from '@root/components/TextStyler/TextStyler';
import { FinancialValue } from '@root/components/FinancialValue/FinancialValue';
import ButtonEdit from '@root/components/ButtonEdit/ButtonEdit';
import ButtonDeleteItem from '@root/components/ButtonDeleteItem/ButtonDeleteItem';

import EditItemForm from '../EditItemForm/EditItemForm';
import TickerInfo from '../TickerInfo/TickerInfo';

import styles from './InvestmentAsset.module.scss';

const InvestmentAsset = ({
	assetName,
	assetAmount,
	editAsset,
	confirmAssetRemoving,
	isCash,
	averagePrice,
	currencyId,
}) => {
	const { t, } = useTranslation();

	return (
		<div className={styles.asset}>
			<div className={styles.infoBlock}>
				<TextStyler size='medium' className={styles.caption}>
					{assetName}
				</TextStyler>
				<FinancialValue value={assetAmount} currencyId={currencyId}/>
				<ButtonEdit
					title={t('brokerItem.editInvestItem')}
					afterActionText={t('common.done')}
					editItemFormElement={
						<EditItemForm
							assetName={assetName}
							submitHandler={editAsset}
						/>
					}
				/>
				<ButtonDeleteItem
					confirmationPlacement="right"
					confirmationOkText={t('common.remove')}
					confirmationCancelText={t('common.keep')}
					afterActionText={`${assetName} ${t('common.removed')}`}
					onConfirm={confirmAssetRemoving}
					title={t('common.sureToRemove')}
					iconClassName={styles.deleteIcon}
				/>
			</div>
			{isCash ?
				null :
				<TickerInfo
					className={styles.infoBlock}
					ticker={assetName}
					amount={assetAmount}
					averagePrice={averagePrice}
				/>
			}
		</div>
	);
};

InvestmentAsset.propTypes = {
	assetName: PropTypes.string.isRequired,
	assetAmount: PropTypes.number.isRequired,
	editAsset: PropTypes.func.isRequired,
	confirmAssetRemoving: PropTypes.func.isRequired,
	isCash: PropTypes.bool.isRequired,
	averagePrice: PropTypes.number.isRequired,
	currencyId: PropTypes.string.isRequired,
};

export default InvestmentAsset;