import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../../components/Logo';
import RegistrationForm
  from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.sass';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import ColumnInfo from '../../components/ColumnInfo/ColumnInfo';
import info from './registrationInfo.json';


const RegistrationPage = (props) => {
  props.clearError();

  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <div className={styles.headerSignUpPage}>
          <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} />
          <div className={styles.linkLoginContainer}>
            <Link
              to="/login"
              style={{ textDecoration: 'none' }}
            >
              <span>Login</span>
            </Link>
          </div>
        </div>
        <RegistrationForm history={props.history} />
      </div>
      <div className={styles.footer}>
        <div className={styles.articlesMainContainer}>
          <ColumnInfo column={info.columns[0]} />
          <ColumnInfo column={info.columns[1]} formattedArticle=
            {<>
              <div className={styles.headerArticle}>
                I have other questions! How
                can I get in touch with
                Squadhelp?
              </div>
              <div className={styles.article}>
                Check out our
                {' '}
                <span className={styles.orangeSpan}>FAQs</span>
                {' '}
                or send us a
                {' '}
                <span className={styles.orangeSpan}>message</span>
                . For assistance with launching a contest, you can also call us at (877) 355-3585 or schedule a {' '}
                <span className={styles.orangeSpan}>Branding Consultation</span>
              </div>
            </>
            } />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearErrorSignUpAndLogin()),
});

export default connect(null, mapDispatchToProps)(RegistrationPage);
