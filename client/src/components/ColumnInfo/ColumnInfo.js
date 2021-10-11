import React from 'react';
import styles from '../../pages/RegistrationPage/RegistrationPage.module.sass';

const ColumnInfo = (props) => {
    const { column, formattedArticle } = props;

    const articles = [];
    column.forEach((art, index) => {
        articles.push(<ArticleInfo key={index} header={art.header} body={art.body} />)
    });

    return (
        <div className={styles.ColumnContainer}>
            {articles}
            {formattedArticle}
        </div>
    )
}

const ArticleInfo = (props) => {
    return (
        <div className={styles.article}>
            <div className={styles.headerArticle}>{props.header}</div>
            <div className={styles.article}>{props.body}</div>
        </div>
    )
}

export default ColumnInfo;



