import React from 'react';
import CardBlock from './CardBlock/CardBlock';
import CONSTANTS from '../../../constants';

const ServicesSection = (props) => {
    const { classes } = props;
    return(
        <div className={classes.space1 + ' ' + classes.container}>
                    <div className={classes.space1Header}>
                        <small className={classes.notes}>Our Services</small>
                        <h2>3 Ways To Use Squadhelp</h2>
                        <p>Squadhelp offers 3 ways to get you a perfect name for your business.</p>
                    </div>
                    <div className={classes.cardBlockContainer}>
                        <CardBlock 
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/4.png`}
                        header='Launch a Contest'
                        body='Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability.'
                        buttonData='Launch a Contest'
                        blueButton={classes.blueButton}
                        imgIcon={classes.imgIcon}/>
                        <CardBlock 
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/5.png`}
                        header='Explore Names For Sale'
                        body='Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design'
                        buttonData='Explore Names For Sale'
                        blueButton={classes.blueButton}
                        imgIcon={classes.imgIcon}/>
                        <CardBlock 
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/6.png`}
                        header='Agency-level Managed Contests'
                        body='Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs'
                        buttonData='Learn More'
                        blueButton={classes.blueButton}
                        imgIcon={classes.imgIcon}/>
                    </div>

                </div>
    )
}

export default ServicesSection;