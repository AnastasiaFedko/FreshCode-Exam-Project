import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sourse.module.sass';

const Sourse = (props) => {

    const { href, src, alt } = props;

    return (
        <div className={styles.sourseHolder}>
            <div>
                <Link to={href} target='_blank'/> 
                    <img src={src} alt={alt}/>
            </div>
        </div>
    );
};

export default Sourse;