import React from 'react';
import PropTypes from 'prop-types';
import {
	useLocation,
	Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { URL_LOGIN } from '../../constants/urls';

const RequireAuth = ({ children }) => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const location = useLocation();

	if (!isAuthenticated) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to={URL_LOGIN} state={{ from: location }} replace />;
	}

	return children;
};

RequireAuth.propTypes = {
	children: PropTypes.node,
};

export default RequireAuth;