import React, { useEffect, useState } from 'react';
import styles from './DomainButton.module.sass';
import classNames from 'classnames';

const DomainButton = (props) => {

    const { buttonText, body, updateValue, checkedValue, buttonValue } = props;

    const [ classList, setClasslist ] = useState( classNames(styles.buttonContainer, styles.activeButton))

    const onClickHandler = () => {
        if( checkedValue !== buttonValue){
            updateValue(buttonValue);  
        }
    }

    useEffect(() => {
        setClasslist((checkedValue === buttonValue)
        ? classNames(styles.buttonContainer, styles.activeButton)
        : styles.buttonContainer) 
    }, [checkedValue, buttonValue])

    return (
        <div className={classList} onClick={onClickHandler}>
            <div className={styles.buttonHolder}>
                <div>
                    <span>{buttonText}</span>
                </div>
                <h5>{body}</h5>
            </div>
        </div>
    );
};

export default DomainButton
