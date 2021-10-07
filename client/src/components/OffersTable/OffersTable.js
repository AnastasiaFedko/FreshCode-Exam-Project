import React from 'react';
import Rating from 'react-rating';
import CONSTANTS from '../../constants';
import styles from './OffersTable.module.sass';

const OffersTable = (props) => {

  const { offers } = props;

  const setOfferTable = () => {

    const array = [];
    for (let i = 0; i < offers.length; i++) {
      array.push(
        <tr>
          <td>{offers[i].id}</td>
          <td>{offers[i].creatorData.firstName + ' ' + offers[i].creatorData.lastName}</td>
          <td>{offers[i].creatorData.email}</td>
          <td>{
            <Rating
              initialRating={offers[i].creatorData.rating}
              fractions={2}
              fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              emptySymbol={(
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline" />)}
              readonly />
          }</td>
          <td>{offers[i].contestData.contestType}</td>
          <td>{offers[i].contestData.contestType == CONSTANTS.LOGO_CONTEST ?
            <img src={`${CONSTANTS.publicURL}${offers[i].fileName}`} alt="logo" />
            : offers[i].text}</td>
          <td>{offers[i].status}</td>
        </tr>)
    }
    if (array.length > 0) {
      return (
        <table>
          <tr>
            <th>Offer Id</th>
            <th>Creator Full Name </th>
            <th>Creator Email</th>
            <th>Creator Rating</th>
            <th>Contest Type</th>
            <th>Offer</th>
            <th>Offer Status</th>
          </tr>
          {array}
        </table>
      )
    }
    return <div className={styles.notFound}>There is no suggestion at this moment</div>;;
  };


  return (
    <div className={styles.offerContainer}>
      {setOfferTable()}
    </div>
  );
};

export default OffersTable;
