import React from 'react';

const OptionConsult = (props) => {
    const { header, body, classes } = props;

    const p = [];

    for (const item of body) {
        if(item.text){
            p.push(item.text);
        }
        else if( item.link){
            p.push(<a key={Date.now()} href={item.link.href}>{item.link.value}</a>);
        }
        
    }

    return (
        <li>
            <span className={classes.roundSpan}>
                <span className='fas fa-angle-right btn-icon__inner'></span>
            </span>
            <div>
                <h4>{header}</h4>
                <p>{p}</p>
            </div>
        </li>
    );
}

export default OptionConsult;