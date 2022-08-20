import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

import { TYPE_ASSET_FUNDS, TYPE_ASSET_STOCKS } from '../../../constants/broker-asset-types';

import styles from './BrokerAssetsContainer.module.scss';

import CashAssets from './CashAssets/CashAssets';
import AssetName from './InvestmentAsset/AssetName/AssetName';
import StockAssets from './StockAssets/StockAssets';
import FundAssets from './FundAssets/FundAssets';

const BrokerAssetsContainer = ({ broker }) => {
	const { t } = useTranslation();
	const onChange = () => {};

	return (
		<div>
			<CashAssets broker={broker}/>
			<Collapse
				ghost
				onChange={onChange}
				expandIcon={({ isActive }) => <div className={styles.iconContainer}>
					<CaretRightOutlined rotate={isActive ? 90 : 0} className={styles.caret}/>
				</div>}
				className={styles.collapseContainer}
			>
				<Collapse.Panel
					key={TYPE_ASSET_STOCKS}
					header={<AssetName assetName={t('brokerItem.stocksCaption')}/>}
					className={styles.collapsePanel}
				>
					<StockAssets broker={broker}/>
				</Collapse.Panel>
				<Collapse.Panel
					key={TYPE_ASSET_FUNDS}
					header={<AssetName assetName={t('brokerItem.fundsCaption')}/>}
					className={styles.collapsePanel}
				>
					<FundAssets broker={broker}/>
				</Collapse.Panel>
			</Collapse>
		</div>
	);
};

BrokerAssetsContainer.propTypes = {
	broker: PropTypes.object.isRequired// TODO shape
};

export default BrokerAssetsContainer;
