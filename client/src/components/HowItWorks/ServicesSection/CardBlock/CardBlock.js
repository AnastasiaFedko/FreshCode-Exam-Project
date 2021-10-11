import React from 'react';
import styles from './CardBlock.module.sass';

const CardBlock = (props) => {
    const {src, header, body, buttonData, blueButton, alt} = props;

    return(
        <div className={styles.cardHolder}>
            <div className={styles.infoContainer}>
                <img src={src} alt={alt} />
                <h3>{header}</h3>
                <p>{body}</p>
            </div>
            <a href='#/' className={blueButton}>{buttonData}</a>
        </div>
    );

}

export default CardBlock;