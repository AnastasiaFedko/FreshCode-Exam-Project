import React from 'react';
import Sourse from './Sourse/Sourse';
import CONSTANTS from '../../../constants'

const Feautured = (props) => {

    const { classes } = props;

    return (
        <div className={classes.container}>
            <div className={classes.feauturedHolder}>
                <div className={classes.feauturedHeader}>
                    <div>
                        <h6>Featured In</h6>
                    </div>
                </div>
                <div className={classes.feauturedBody}>
                    <div className={classes.sourseContainer}>
                        <Sourse href='http://www.forbes.com/sites/forbestreptalks/2016/07/11/not-sure-how-to-name-a-startup-squadhelp-will-crowdsource-it-for-199'
                            src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/forbes.png`}
                            alt='forbes' />
                        <Sourse href="http://thenextweb.com/contributors/crowdsource-startup-name-with-squadhelp/"
                            src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/TNW.png`}
                            alt="TNW" />
                        <Sourse href="http://www.chicagotribune.com/bluesky/originals/ct-squadhelp-startup-names-bsi-20170331-story.html"
                            src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/chicago.png`} alt="chicago" />
                        <Sourse href="http://mashable.com/2011/04/01/make-money-crowdworking/"
                            src={`${CONSTANTS.STATIC_IMAGES_PATH}/howitworks/Mashable.png`} alt="Mashable" />
                    </div>
                </div>
            </div >
        </div >
    )
}


export default Feautured;