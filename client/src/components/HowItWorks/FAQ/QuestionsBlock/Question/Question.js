import React, { useState } from 'react';
import styles from './Question.module.sass';

const Question = (props) => {
    const { question, answer } = props;
    const answerBody = [];

    const [open, setOpen] = useState(false);

    const createLink = (data) => (<a key={`${Date.now()}${Math.floor(Math.random() * 1000)}`} href={data.href}>{data.value}</a>)

    const createUL = (data) => {
        const list = [];
        for (let i = 0; i < data.length; i++) {
            list.push(createLi(data[i], i));
        }
        return <ul key={`${Date.now()}${Math.floor(Math.random() * 1000)}`}>{list}</ul>
    }

    const createLi = (data, index) => {
        const list = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].text) {
                list.push(data[i].text);
            }
            else if (data[i].link) {
                list.push(createLink(data[i].link));
            }
        }
        return <li key={`${Date.now()}${Math.floor(Math.random() * 1000)}`}>{list}</li>
    }

    for (let i = 0; i < answer.length; i++) {
        if (answer[i].text) {
            answerBody.push(answer[i].text);
        }
        else if (answer[i].link) {
            answerBody.push(createLink(answer[i].link));
        }
        else if (answer[i].ul) {
            answerBody.push(createUL(answer[i].ul));
        }
    }

    return (
        <div className={styles.questionHolder}>
            <div className={styles.questionHeader}>
                <h5>
                    <button  onClick={() => { setOpen(!open)}}>
                        {question}
                        <span id='collapsedSpan' className={open ? '' : styles.collapsed}>
                            <span className="fas fa-arrow-down small"></span>
                        </span>
                    </button>
                </h5>
            </div>
            <div id='answerBody' className={open ? styles.collapsing + ' ' + styles.show : styles.collapsing}>
                <div className={styles.answerContainer}>{answerBody}</div>
            </div>

        </div>
    );
};

export default Question;
