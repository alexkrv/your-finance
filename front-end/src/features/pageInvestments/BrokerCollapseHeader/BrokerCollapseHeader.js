import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';

import UploadButton from '../../../components/UploadButton/UploadButton';

import styles from './BrokerCollapseHeader.module.scss';

const BrokerCollapseHeader = ({ broker }) => {
	return <Space size='small' direction='horizontal' align='end' className={styles.container}>
		<UploadButton
			actionUrl={ `/broker/avatar?brokerId=${broker._id}` }
			avatar={broker.avatar}
		/>
		<span className={styles.brokerName}>{broker.name}</span>
	</Space>;
};

BrokerCollapseHeader.propTypes = {

};

export default BrokerCollapseHeader;