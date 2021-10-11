import React from 'react';
import { Form, Formik } from 'formik';
import FormInput from '../FormInput/FormInput';
import moment from 'moment';
import styles from './CreateEvent.module.sass';
import Schems from '../../validators/validationSchems';

const CreateEvent = (props) => {

    const { userId, needToUpdateEvents } = props;

    const clicked = (values, { resetForm }) => {
        const newEvent = {
            eventId: `${userId}${Date.now()}`,
            eventName: values.eventName,
            eventStart: values.eventStart,
            eventNotification: values.eventNotification
        }
        needToUpdateEvents(newEvent);
        resetForm();
    };

    return (
        <div className={styles.container}>
            <p>Create New Event</p>
            <Formik
                onSubmit={clicked}
                initialValues={{
                    eventName: '',
                    eventStart: '',
                    eventNotification: ''
                }}
                validationSchema={Schems.EventSchema} >
                <Form>
                    <label>Name:</label>
                    <FormInput
                        name="eventName"
                        type="text"
                        label="Event Name"
                        classes={{
                            container: styles.inputContainer,
                            input: styles.input,
                            warning: styles.warning,
                            notValid: styles.notValid,
                            valid: styles.valid
                        }} />
                    <label>Start date:</label>
                    <FormInput
                        name="eventStart"
                        type="datetime-local"
                        min={moment().format('YYYY-MM-DDTHH:mm')}
                        classes={{
                            container: styles.inputContainer,
                            input: styles.input,
                            warning: styles.warning,
                            notValid: styles.notValid,
                            valid: styles.valid
                        }} />
                    <label>Notification date:</label>
                    <FormInput
                        name="eventNotification"
                        type="datetime-local"
                        min={moment().format('YYYY-MM-DDTHH:mm')}
                        classes={{
                            container: styles.inputContainer,
                            input: styles.input,
                            warning: styles.warning,
                            notValid: styles.notValid,
                            valid: styles.valid
                        }} />
                    <button type="submit" disabled={false}>Submit</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreateEvent;