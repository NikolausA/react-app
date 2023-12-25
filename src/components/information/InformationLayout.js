import React from 'react';
import styles from './Information.module.css';
import PropTypes from 'prop-types';

export const InformationLayout = ({ status }) => {
	return <div className={styles.information}>{status}</div>;
};

InformationLayout.propTypes = {
	status: PropTypes.string,
};
