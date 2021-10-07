import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import { changeShowImage } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import styles from './ModeratorsOfferBox.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../OfferBox/confirmStyle.css';

const ModeratorsOfferBox = (props) => {
  const { data } = props;

  const confirmeOffer = () => {
    
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferStatus( data, 'confirme'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const declineOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferStatus(data, 'decline'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const offerStatus = () => {
    if (data.status === CONSTANTS.OFFER_STATUS_CONFIRMED) {
      return <i className={classNames('fas fa-thumbs-up confirme', styles.confirme)} />;
    } if (data.status === CONSTANTS.OFFER_STATUS_DECLINED) {
      return <i className={classNames('fas fa-thumbs-up decline', styles.decline)} />;
    }
    return null;
  };

  const { avatar, firstName, lastName, email, rating, } = data.creatorData;
  const { contestType } = data.contestData;
  
  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${avatar}`}
              alt="user"
            />
            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              initialRating={rating}
              fractions={2}
              fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              emptySymbol={(
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline" />)}
              readonly />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {
            contestType === CONSTANTS.LOGO_CONTEST
              ? (
                <img
                  onClick={() => props.changeShowImage({ imagePath: data.fileName, isShowOnFull: true })}
                  className={styles.responseLogo}
                  src={`${CONSTANTS.publicURL}${data.fileName}`}
                  alt="logo"
                />
              )
              : <span className={styles.response}>{data.text}</span>
          }
        </div>
      </div>
      {props.needButtons(data.status) && (
        <div className={styles.btnsContainer}>        
          <div onClick={confirmeOffer} className={styles.confirmeBtn}>Confirme</div>
          <div onClick={declineOffer} className={styles.declineBtn}>Decline</div>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

export default withRouter(connect(null, mapDispatchToProps)(ModeratorsOfferBox));
