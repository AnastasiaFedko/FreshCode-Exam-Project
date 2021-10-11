import React from 'react';
import styles from './ReadyToGetStarted.module.sass';

const ReadyToGetStarted = (props) => {
    const { classes } = props;

    return (
        <div className={styles.mainGradient}>
            <div className={classes.space1 + ' ' + classes.container + ' ' + styles.readyContainer}>
                <h3>Ready to get started?</h3>
                <p>
                    Fill out your contest brief and begin receiving custom name suggestions within minutes.
                </p>
                <a className={classes.blueButton + ' ' + styles.startContest} href="/startContest">Start A Contest</a>
            </div>
        </div>
    );
}

export default ReadyToGetStarted;