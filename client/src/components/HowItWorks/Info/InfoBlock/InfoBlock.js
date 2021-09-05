import React from 'react';
import styles from './InfoBlock.module.sass';

const InfoBlock = (props) => {

    const { src, text, id } = props;

    return (
        <div className={styles.infoBlockHolder}>
            <div className={styles.infoBlockBody + ' ' + styles[`${id}`]}>
                <div>
                    <img src={src}/>
                </div>                
                {text}
            </div>
            
        </div>
    );
}

export default InfoBlock