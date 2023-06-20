import React from 'react';
import PropTypes from 'prop-types';

import styles from './AssetName.module.css';

const AssetName = ({ assetName }) => {
	return (
		<div className={styles.assetName}>{assetName}</div>
	);
};

AssetName.propTypes = {
	assetName: PropTypes.string.isRequired
};

export default AssetName;