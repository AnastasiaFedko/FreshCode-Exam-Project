import React from 'react';
import InfoBlock from './InfoBlock/InfoBlock';
import CONSTANTS from '../../../constants';

const Info = (props) => {

    const { classes } = props;

    return (
        <div className={classes.space1 + ' ' + classes.container}>
            <div className={classes.infoContainer}>
                <InfoBlock id='firstInfo' src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/stars.png`}
                    text={<p><span>4.9 out of 5 stars</span> from 25,000+ customers.</p>} alt='stars'/>
                <InfoBlock id='secondInfo' src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/7.png`}
                    text={<p>Our branding community stands <span>200,000+</span> strong.</p>} alt='7'/>
                <InfoBlock id='thirdInfo' src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/sharing-files.png`}
                    text={<p><span>40+ Industries</span> supported across more than <span>85 countries </span>
                         – and counting.</p>} alt='sharing-files'/>
            </div>
        </div>
    );
}

export default Info