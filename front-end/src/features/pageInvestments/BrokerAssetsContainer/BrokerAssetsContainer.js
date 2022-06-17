import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

import styles from './BrokerAssetsContainer.module.scss';

import CashAssets from './CashAssets/CashAssets';
import InvestmentAsset from './InvestmentAsset/InvestmentAsset';
import AssetName from './InvestmentAsset/AssetName/AssetName';

const BrokerAssetsContainer = ({ broker }) => {
	const { t } = useTranslation();
	const onChange = () => {};
	const assetsKey = Object.keys(broker.assets).filter(assetKey => assetKey !== 'cash');
	const assetNames = {
		'stocks': t('brokerItem.stocksCaption'),
		'funds': t('brokerItem.fundsCaption'),
	};

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
				{assetsKey.map(assetKey =>
					<Collapse.Panel
						key={assetKey}
						header={<AssetName assetName={assetNames[assetKey]}/>}
						className={styles.collapsePanel}
					>
						<InvestmentAsset
							brokerId={broker._id}
							assets={broker.assets[assetKey]}
						/>
					</Collapse.Panel>)}
			</Collapse>
		</div>
	);
};

BrokerAssetsContainer.propTypes = {
	broker: PropTypes.object.isRequired// TODO shape
};

export default BrokerAssetsContainer;