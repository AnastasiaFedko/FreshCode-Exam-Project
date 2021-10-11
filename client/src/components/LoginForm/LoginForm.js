import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { authActionLogin, clearAuth } from '../../actions/actionCreator';
import styles from './LoginForm.module.sass';
import FormInput from '../FormInput/FormInput';
import Schems from '../../validators/validationSchems';
import Error from '../Error/Error';

class LoginForm extends React.Component {
  
  componentDidMount() {
    const token = this.props.recowerToken;
    if(token){
      this.props.loginRequest({ data: {token}, history: this.props.history });
    }
  }

  componentWillUnmount() {
    this.props.authClear();
  }

  clicked = (values) => {
    this.props.loginRequest({ data: values, history: this.props.history });
  };

  render() {

    const { authClear, submitting, auth: { error, isFetching } } = this.props;

    const formInputClasses = {
      container: styles.inputContainer,
      input: styles.input,
      warning: styles.fieldWarning,
      notValid: styles.notValid,
      valid: styles.valid,
    };

    return (
      <div className={styles.loginForm}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={authClear}
          />
        )}
        <h2>LOGIN TO YOUR ACCOUNT</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={this.clicked}
          validationSchema={Schems.LoginSchem}>
          <Form>
            <FormInput
              classes={formInputClasses}
              name="email"
              type="text"
              label="Email Address"/>
            <FormInput
              classes={formInputClasses}
              name="password"
              type="password"
              label="Password"/>
            <button
              type="submit"
              disabled={submitting}
              className={styles.submitContainer}>
              <span className={styles.inscription}>
                {isFetching
                  ? 'Submitting...'
                  : 'LOGIN'}
              </span>
            </button>
          </Form>
        </Formik>
        <Link to="/recoverPassword" className={styles.forgot}><span>Forgot password?</span></Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => (
  {
    loginRequest: ({ data, history }) => dispatch(authActionLogin(data, history)),
    authClear: () => dispatch(clearAuth()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
