import React from 'react';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { clearAuth, recoverPasswordAction } from '../../actions/actionCreator';
import styles from './RecoverPasswordForm.module.sass';
import FormInput from '../FormInput/FormInput';
import Schems from '../../validators/validationSchems';
import Error from '../Error/Error';

class RecoverPasswordForm extends React.Component {

  componentWillUnmount() {
    this.props.authClear();
  }

  clicked = (values) => {
    this.props.recoverPasswordRequest({ data: values, history: this.props.history });
  };

  render() {
    const { authClear, recower: { error, isFetching, success } } = this.props;

    const formInputClasses = {
      container: styles.inputContainer,
      input: styles.input,
      warning: styles.fieldWarning,
      notValid: styles.notValid,
      valid: styles.valid,
    };

    return (
      <div className={styles.recowerForm}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={authClear}
          />
        )}
        {success.result &&
          (<div className={styles.successContainer}>
            <span>{success.message}</span>
            <i class="fas fa-check-circle"></i>
          </div>
          )}
        <h2>RECOVER PASSWORD</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={this.clicked}
          validationSchema={Schems.LoginSchem} >
          <Form>
            <FormInput
              classes={formInputClasses}
              name="email"
              type="text"
              label="Email Address"
              disabled={success.result}/>
            <FormInput
              classes={formInputClasses}
              name="password"
              type="password"
              label="New Password"
              disabled={success.result}/>
            <button
              type="submit"
              disabled={success.result}
              className={styles.submitContainer}>
              <span className={styles.inscription}>
                {isFetching
                  ? 'Submitting...'
                  : 'RECOVER PASSWORD'}
              </span>
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { recower } = state;
  return { recower };
};

const mapDispatchToProps = (dispatch) => (
  {
    recoverPasswordRequest: ({ data, history }) => dispatch(recoverPasswordAction(data, history)),
    authClear: () => dispatch(clearAuth()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPasswordForm);
