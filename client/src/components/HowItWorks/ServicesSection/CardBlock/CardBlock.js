import React from 'react';
import styles from './CardBlock.module.sass';

const CardBlock = (props) => {
    const {src, header, body, buttonData, blueButton} = props;

    return(
        <div className={styles.cardHolder}>
            <div className={styles.infoContainer}>
                <img src={src} />
                <h3>{header}</h3>
                <p>{body}</p>
            </div>
            <a className={blueButton}>{buttonData}</a>
        </div>
    );

}

export default CardBlock;