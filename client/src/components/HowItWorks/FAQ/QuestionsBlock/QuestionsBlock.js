import React from 'react';
import Question from './Question/Question';



const QuestionsBlock = (props) => {
    const { classes, id, questions, header } = props;

    const blockQuestions = [];
    questions.forEach((q) => {
        blockQuestions.push(<Question key={`${Date.now()}${Math.floor(Math.random() * 1000)}`} question={q.question} answer={q.answer} />)
    });

    return (
        <>
            <div id={id} className={classes.questionsBlock}>
                <div>
                    <h3>{header}</h3>
                </div>
                <div>
                    {blockQuestions}
                </div>

            </div>
            <hr />
        </>
    );
}

export default QuestionsBlock;

