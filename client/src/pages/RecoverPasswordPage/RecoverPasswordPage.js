import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../../components/Logo';
import styles from './RecoverPasswordPage.module.sass';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import RecoverPasswordForm from '../../components/RecoverPasswordForm/RecoverPasswordForm';

const RecoverPasswordPage = (props) => (
  <div className={styles.mainContainer}>
    <div className={styles.recowerContainer}>
      <div className={styles.headerSignUpPage}>
        <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
        <div className={styles.linkRecowerContainer}>
          <Link
            to="/registration"
            style={{ textDecoration: 'none' }}
          >
            <span>Signup</span>
          </Link>
        </div>
      </div>
      <div className={styles.recowerFormContainer}>
        <RecoverPasswordForm history={props.history}  />
      </div>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearErrorSignUpAndLogin()),
});

export default connect(null, mapDispatchToProps)(RecoverPasswordPage);
