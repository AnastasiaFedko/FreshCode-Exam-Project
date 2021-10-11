import React from 'react';
import styles from './Step.module.sass';

const Step = (props) => {
    const { number, text } = props;
    return (
        <li>
            <div className={styles.step}>
                <div className={styles.numberHolder}>
                    <span>{number}</span> 
                </div>               
                <div className={styles.textHolder}>
                    <p>{text}</p>
                </div>
            </div>
        </li>

    );
}
export default Step;