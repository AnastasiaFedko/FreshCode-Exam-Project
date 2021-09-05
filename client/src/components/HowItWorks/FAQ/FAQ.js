import React from 'react';
import styles from './FAQ.module.sass';
import QuestionsBlock from './QuestionsBlock/QuestionsBlock.js';
import * as questions from './questionsInfo.json';

const FAQ = (props) => {
    const { classes } = props;
    return (
        <div className={classes.space2}>
            <div className={styles.row}>
                <div className={styles.blockStartPoint} >
                    <nav className={styles.navContainer}>
                        <ul>
                            <li>
                                <a href="#contests">Launching A Contest</a>
                            </li>
                            <li>
                                <a href="#marketplace">Buying From Marketplace</a>
                            </li>
                            <li>
                                <a href="#managed">Managed Contests</a>
                            </li>
                            <li>
                                <a href="#creatives">For Creatives</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.questionContainer}>
                    <QuestionsBlock 
                        id='contests' 
                        questions={questions.launchingcontest} 
                        header='Launching A Contest'
                        classes={{
                            questionsBlock: styles.questionsBlock
                        }}/>                
                    <QuestionsBlock 
                        id='marketplace' 
                        questions={questions.buyingfromarketplace} 
                        header='Buying From Marketplace'
                        classes={{
                            questionsBlock: styles.questionsBlock
                        }}/>
                    <QuestionsBlock 
                        id='managed' 
                        questions={questions.managedcontests}
                        header='Managed Contests'
                        classes={{
                            questionsBlock: styles.questionsBlock
                        }}/>
                    <QuestionsBlock 
                        id='creatives' 
                        questions={questions.forcreatives}
                        header='For Creatives'
                        classes={{
                            questionsBlock: styles.questionsBlock
                        }}/>
                </div>
            </div>
        </div>
    );
}

export default FAQ;