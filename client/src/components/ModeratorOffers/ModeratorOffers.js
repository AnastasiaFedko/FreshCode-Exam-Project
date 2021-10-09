import React from 'react';
import { connect } from 'react-redux';
import { clearSetOfferStatusByModeratorError, setOfferStatusByModerator, } from '../../actions/actionCreator';
import styles from './ModeratorOffers.module.sass';
import CONSTANTS from '../../constants';
import 'react-image-lightbox/style.css';
import ModeratorsOfferBox from '../ModeratorsOfferBox/ModeratorsOfferBox';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

const ModeratorsOffers = (props) => {

  const setOffersList = () => {

    const array = [];
    const { offers } = props;
      for (let i = 0; i < offers.length; i++) {
        if (offers[i].status === CONSTANTS.OFFER_STATUS_PENDING) {
          array.push(<ModeratorsOfferBox
            data={offers[i]}
            key={offers[i].id}
            needButtons={needButtons}
            setOfferStatus={setOfferStatus}
            date={new Date()}
          />);
        }
      }
    
    return array.length !== 0 ? array : <div className={styles.notFound}>There is no suggestion at this moment</div>;
  };

  const needButtons = (offerStatus) => {
    return offerStatus === CONSTANTS.OFFER_STATUS_PENDING;
  };

  const setOfferStatus = ({ id, text, originalFileName, contestData, creatorData, }, command) => {
    props.clearSetOfferStatusByModeratorError();
    const obj = {
      command,
      offerId: id,
      creatorId: creatorData.id,
      orderId: contestData.orderId,
      priority: contestData.priority,
      contestId: contestData.id,
      email: creatorData.email,
      firstName: creatorData.firstName,
      lastName: creatorData.lastName,
      text,
      originalFileName
    };
    props.setOfferStatus(obj);
  };

  const { isFetching, setOfferStatusError, clearSetOfferStatusByModeratorError } = props;

  return (
    <div className={styles.offersContainer}>
      {isFetching
        ? (<div className={styles.containerSpinner}>
          <Spinner />
        </div>)
        : (
          <div className={styles.offers}>
            {setOffersList()}
          </div>
        )}
      {setOfferStatusError && (
        <Error
          data={setOfferStatusError.data}
          status={setOfferStatusError.status}
          clearError={clearSetOfferStatusByModeratorError}
        />)}
    </div>
  )
}

const mapStateToProps = (state) => {
  const { offersStore: { offers, isFetching, setOfferStatusError, countPending } } = state;
  return { offers, isFetching, setOfferStatusError, countPending };
};

const mapDispatchToProps = (dispatch) => ({
  setOfferStatus: (data) => dispatch(setOfferStatusByModerator(data)),
  clearSetOfferStatusByModeratorError: () => dispatch(clearSetOfferStatusByModeratorError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorsOffers);
