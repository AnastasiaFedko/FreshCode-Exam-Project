import React from 'react';
import CONSTANTS from '../../../constants';

const HeroBanner = (props) => {
    const { classes } = props;
    return(
        <div className={classes.heroBanner}>
                    <div className={classes.space1 + ' ' + classes.container}>
                        <div className={classes.firstContainer}>
                            <span className={classes.notes}>World's #1 Naming Platform</span>
                            <div>
                                <h1>How Does Squadhelp Work?</h1>
                                <p>
                                    Squadhelp helps you come up with a great name for your business by combining the power of crowdsourcing with sophisticated technology and Agency-level validation services.
                                </p>
                            </div>
                            <div>
                                <a className={classes.blueButton} href='/howitworks'>
                                    <small className="fas fa-play mr-2"></small>{' '}
                                    Play Video
                                </a>
                            </div>
                        </div>
                        <div className={classes.heroImgHolder}>
                            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/1.png`} />
                        </div>
                    </div>
                </div>
    )
}
export default HeroBanner;