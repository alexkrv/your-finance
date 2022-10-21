import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

import UploadButton from '../../../components/UploadButton/UploadButton';
import ButtonEdit from '../../../components/ButtonEdit/ButtonEdit';

import styles from './BrokerCollapseHeader.module.scss';

import EditBrokerForm from './EditBrokerForm/EditBrokerForm';

const BrokerCollapseHeader = ({ broker }) => {
	const { t } = useTranslation();

	return <Space
		size='small'
		direction='horizontal'
		align='end'
		className={styles.container}
		onClick={event => event.stopPropagation()}
	>
		<UploadButton
			actionUrl={ `/broker/avatar?brokerId=${broker._id}` }
			avatar={broker.avatar}
		/>
		<span className={styles.brokerName}>
			{broker.name}
		</span>
		<ButtonEdit
			onConfirm={() => {/*TODO create handler*/}}
			title={t('brokerItem.editInvestItem')}
			afterActionText={t('common.done')}
			editItemFormElement={<EditBrokerForm brokerId={broker._id}/>}
		/>
	</Space>;
};

BrokerCollapseHeader.propTypes = {

};

export default BrokerCollapseHeader;