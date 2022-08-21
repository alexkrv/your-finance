import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

import { TYPE_ASSET_CASH, TYPE_ASSET_FUNDS, TYPE_ASSET_STOCKS } from '../../../constants/broker-asset-types';

import styles from './BrokerAssetsContainer.module.scss';

import AssetName from './InvestmentAsset/AssetName/AssetName';
import FormAddCashAsset from './FormAddCashAsset/FormAddCashAsset';
import InvestmentAsset from './InvestmentAsset/InvestmentAsset';
import FormAddStockAsset from './FormAddStockAsset/FormAddStockAsset';
import FormAddFundAsset from './FormAddFundAsset/FormAddFundAsset';

const BrokerAssetsContainer = ({ broker }) => {
	const { t } = useTranslation();
	const onChange = () => {/*TODO*/};

	return (
		<div>
			<Collapse
				ghost
				onChange={onChange}
				expandIcon={({ isActive }) => <div className={styles.iconContainer}>
					<CaretRightOutlined rotate={isActive ? 90 : 0} className={styles.caret}/>
				</div>}
				className={styles.collapseContainer}
			>
				<Collapse.Panel
					key={TYPE_ASSET_CASH}
					header={<AssetName assetName={t('brokerItem.cash')}/>}
					className={styles.collapsePanel}
				>
					<InvestmentAsset
						broker={broker}
						assetType={TYPE_ASSET_CASH}
						buttonAddAssetText={t('brokerItem.addBrokerAssetCash')}
						addAssetForm={<FormAddCashAsset broker={broker}/>}
					/>
				</Collapse.Panel>
				<Collapse.Panel
					key={TYPE_ASSET_STOCKS}
					header={<AssetName assetName={t('brokerItem.stocksCaption')}/>}
					className={styles.collapsePanel}
				>
					<InvestmentAsset
						broker={broker}
						assetType={TYPE_ASSET_STOCKS}
						buttonAddAssetText={t('brokerItem.addBrokerStockAsset')}
						addAssetForm={<FormAddStockAsset broker={broker}/>}
					/>
				</Collapse.Panel>
				<Collapse.Panel
					key={TYPE_ASSET_FUNDS}
					header={<AssetName assetName={t('brokerItem.fundsCaption')}/>}
					className={styles.collapsePanel}
				>
					<InvestmentAsset
						broker={broker}
						assetType={TYPE_ASSET_FUNDS}
						buttonAddAssetText={t('brokerItem.addBrokerAssetFund')}
						addAssetForm={<FormAddFundAsset broker={broker}/>}
					/>
				</Collapse.Panel>
			</Collapse>
		</div>
	);
};

BrokerAssetsContainer.propTypes = {
	broker: PropTypes.object.isRequired// TODO shape
};

export default BrokerAssetsContainer;
