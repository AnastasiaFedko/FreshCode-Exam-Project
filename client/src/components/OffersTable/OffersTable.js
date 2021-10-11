import React from 'react';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import styles from './OffersTable.module.sass';

const OffersTable = (props) => {

  const { offers } = props

  const setOfferTable = () => {

    const array = [];
    for (let i = 0; i < offers.length; i++) {
      array.push(
        <tr key={i}>
          <td>{offers[i].id}</td>
          <td>{offers[i].creatorData.firstName + ' ' + offers[i].creatorData.lastName}</td>
          <td className={styles.wrapTableColumn}>{offers[i].creatorData.email}</td>
          <td>{
            <Rating
              initialRating={offers[i].creatorData.rating}
              fractions={2}
              fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              readonly 
              emptySymbol={(
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline" />)}/>              
          }</td>
          <td>{offers[i].contestData.contestType}</td>
          <td className={styles.wrapTableColumn}>{offers[i].contestData.contestType === CONSTANTS.LOGO_CONTEST ?
            <img  className={styles.logo} src={`${CONSTANTS.publicURL}${offers[i].fileName}`} alt="logo" />
            : offers[i].text}</td>
          <td>{offers[i].status}</td>
        </tr>)
    }
    if (array.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              <th>Offer Id</th>
              <th className={styles.noWrapTableColumn}>Creator Full Name</th>
              <th className={styles.noWrapTableColumn}>Creator Email</th>
              <th className={styles.noWrapTableColumn}>Creator Rating</th>
              <th>Contest Type</th>
              <th className={styles.wrapTableColumn}>Offer</th>
              <th className={styles.noWrapTableColumn}>Offer Status</th>
            </tr>
          </thead>
          <tbody>{array}</tbody>
        </table>
      )
    }
    return <div className={styles.notFound}>There is no suggestion at this moment</div>;;
  };


  return (
    <div className={styles.tableContainer}>
      {setOfferTable()}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { offers } = state.offersStore;
  return { offers };
}

export default connect(mapStateToProps)(OffersTable);
