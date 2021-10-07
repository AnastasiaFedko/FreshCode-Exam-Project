import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { clearSetOfferStatusError, setOfferStatusByModerator, } from '../../actions/actionCreator';
import styles from './ContestPage.module.sass';
import CONSTANTS from '../../constants';
import 'react-image-lightbox/style.css';
import ModeratorsOfferBox from '../ModeratorsOfferBox/ModeratorsOfferBox';

const ModeratorsOffers = (props) => {

  const setOffersList = () => {

    const array = [];
    const { offers } = this.props.offersStore.offers;
    for (let i = 0; i < offers.length; i++) {
      if (offers[i].status === CONSTANTS.OFFER_STATUS_PENDING) {
        array.push(<ModeratorsOfferBox
          data={offers[i]}
          key={offers[i].id}
          needButtons={needButtons(offers.offerStatus)}
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

  const setOfferStatus = ({  id, text, originalFileName, contestData ,creatorData, }, command ) => {
    this.props.clearSetOfferStatusError();
    const obj = {
      command,
      offerId : id,
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
    this.props.setOfferStatus(obj);
  };

  return (
    <div>
      <div className={styles.offers}>
        {setOffersList()}
      </div>
    </div>
  );

}

const mapStateToProps = (state) => {
  const { offersStore } = state;
  return { offersStore };
};

const mapDispatchToProps = (dispatch) => ({
  setOfferStatus: (data) => dispatch(setOfferStatusByModerator(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorsOffers);
