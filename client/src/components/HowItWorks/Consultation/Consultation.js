import React from 'react';
import OptionConsult from './OptionConsult/OptionConsult';
import CONSTANTS from '../../../constants';
import styles from './Consultation.module.sass';

const Consultation = (props) => {
    const { classes } = props;
    return (
        <div className={classes.space1 + ' ' + classes.container + ' ' + styles.consultationContainer}>
            <div className={styles.consultationHolder} >
                <div className={styles.optionsContainer}>
                    <div className={styles.optionsHolder}>
                        <ul>
                            <OptionConsult header='Pay a Fraction of cost vs hiring an agency'
                                body={[{ text: 'For as low as $199, our naming contests and marketplace allow you to get an amazing brand quickly and affordably.'}]}
                                classes={{
                                    roundSpan: styles.roundSpan
                                }} />

                            <li></li>
                            <OptionConsult header='Satisfaction Guarantee'
                                body={[{text: 'Of course! We have policies in place to ensure that you are satisfied with your experience. '}, {link: {
                                    href: '#',
                                    value: 'Learn more'
                                }}]} 
                                classes={{
                                    roundSpan: styles.roundSpan
                                }}/>
                        </ul>
                    </div>
                </div>
                <div className={styles.scheduleConsultation}>
                    <div className={styles.optionsHolder}>
                        <ul>
                            <li>
                                <div className={styles.scheduleConsultationBody}>
                                    <h4>Questions?</h4>
                                    <p>Speak with a Squadhelp platform expert to learn more and get your questions answered.</p>
                                    <button>Schedule Consultation</button>
                                    <br/><br/>
                                    <a href={`tel:${CONSTANTS.CONTACT_US.PHONE}`}>
                                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/phone.png`} alt="phone" />
                                        &nbsp;{CONSTANTS.CONTACT_US.PHONE}
                                    </a>
                                    <br/>
                                    <span>Call us for assistance</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Consultation;