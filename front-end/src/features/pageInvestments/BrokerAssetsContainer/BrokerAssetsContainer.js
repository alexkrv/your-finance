import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import styles from './BrokerAssetsContainer.module.scss';

import CashAssets from './CashAssets/CashAssets';

const BrokerAssetsContainer = ({ broker }) => {
	const { t } = useTranslation();

	return (
		<div>
			<CashAssets broker={broker}/>
		</div>
	);
};

BrokerAssetsContainer.propTypes = {

};

export default BrokerAssetsContainer;