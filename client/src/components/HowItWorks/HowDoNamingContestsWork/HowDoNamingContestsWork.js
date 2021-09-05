import React from 'react';
import CONSTANTS from '../../../constants';
import Step from './Step/Step';

const HowDoNamingContestsWork = (props) => {
    const { classes } = props;
    return (
        <>
            <hr />
            <div className={classes.space2}>
                <div className={classes.space2Header}>
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/2.png`} alt='2' />
                    <h2>How Do Naming Contests Work?</h2>
                </div>
                <div className={classes.space2Body}>
                    <div className={classes.stepsImgHolder}>
                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/3.png`} alt='3' />
                    </div>
                    <div className={classes.stepsHolder}>
                        <ul>
                            <Step number='1.' text='Fill out your Naming Brief and begin receiving name ideas in minutes' />
                            <Step number='2.' text='Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.' />
                            <Step number='3.' text='Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.' />
                            <Step number='4.' text='Pick a Winner. The winner gets paid for their submission.' />
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
}
export default HowDoNamingContestsWork;