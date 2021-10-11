import React, { useState } from 'react';
import DomainButton from '../DomainButton/DomainButton';
import styles from './ButtonGroup.module.sass';

const ButtonGroup = () => {

    const [value, setValue] = useState('asname')

    const updateValue = (value) => {
        setValue(value);
    }

    return (
        <>
            <div className={styles.buttonGroupHeader}>
                <label>Do you want a matching domain (.com URL) with your name?</label>
                <span>If you want a matching domain, our platform will only accept those name suggestions where the domain is available. (Recommended)</span>
            </div>
            <div className={styles.buttonGroupBody}>
                <input type="hidden" name="companyUrlNeeded" value={value} />
                <DomainButton buttonValue='asname' buttonText='Yes' body='The Domain should exactly match the name'
                    updateValue={updateValue} checkedValue={value} />
                <DomainButton buttonValue='yes' buttonText='Yes' body='But minor variations are allowed (Recommended)'
                    updateValue={updateValue} checkedValue={value} />
                <DomainButton buttonValue='no' buttonText='No' body='I am only looking for a name, not a Domain'
                    updateValue={updateValue} checkedValue={value} />
            </div>
        </>
    )
};

export default ButtonGroup;