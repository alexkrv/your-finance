import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

import styles from './BrokerAssetsContainer.module.scss';

import CashAssets from './CashAssets/CashAssets';
import AssetName from './InvestmentAsset/AssetName/AssetName';
import StockAssets from './StockAssets/StockAssets';

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
					key={'stocks'}
					header={<AssetName assetName={t('brokerItem.stocksCaption')}/>}
					className={styles.collapsePanel}
				>
					<StockAssets broker={broker}/>
				</Collapse.Panel>
			</Collapse>
		</div>
	);
};

BrokerAssetsContainer.propTypes = {
	broker: PropTypes.object.isRequired// TODO shape
};

export default BrokerAssetsContainer;