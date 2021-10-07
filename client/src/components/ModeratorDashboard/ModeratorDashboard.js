import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { changeOffersModeView, clearOffersList, getOffers } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import styles from './ModeratorDashboard.module.sass';
import ModeratorsOfferBox from '../ModeratorsOfferBox/ModeratorsOfferBox';
import OffersTable from '../OffersTable/OffersTable';
import TryAgain from '../TryAgain/TryAgain';

class ModeratorDashboard extends React.Component {

    componentDidMount() {
        if (this.props.userStore.data.role !== CONSTANTS.MODERATOR) {
            this.props.history.replace('/');
        }
        this.props.getOffers();
    }

    componentDidMount() {
        this.props.getOffers();
    }

    tryToGetContest = () => {
        this.props.clearOffersList();
        this.props.getOffers();
    };

    componentWillUnmount() {
        this.props.clearOffersList();
    }

    render() {
        const { offersModeView, error, isFetching, getOffers } = this.props;
        return (
            <div className={styles.mainContainer}>
                <div className={styles.filterContainer}>
                    <div
                        onClick={() => changeOffersModeView(CONSTANTS.OFFERS_INFO_MODE)}
                        className={classNames({
                            [styles.activeFilter]: CONSTANTS.OFFERS_INFO_MODE === offersModeView,
                            [styles.filter]: CONSTANTS.OFFERS_INFO_MODE !== offersModeView,
                        })} >
                        Pending Offers
                    </div>
                    <div
                        onClick={() => changeOffersModeView(CONSTANTS.OFFERS_TABLE_MODE)}
                        className={classNames({
                            [styles.activeFilter]: CONSTANTS.OFFERS_TABLE_MODE === offersModeView,
                            [styles.filter]: CONSTANTS.OFFERS_TABLE_MODE !== offersModeView,
                        })} >
                        Offers Table
                    </div>
                </div>
                <div className={styles.contestsContainer}>
                    {error ? <div className={styles.tryContainer}><TryAgain getData={getOffers()} /></div>
                        : (isFetching
                            ? (<div className={styles.containerSpinner}>
                                <Spinner />
                            </div>)
                            : (offersModeView === CONSTANTS.OFFERS_INFO_MODE
                                ? <ModeratorsOfferBox />
                                : <OffersTable offers={getOffers()} />))
                    }
                </div>
            </div>);
    }
}

const mapStateToProps = (state) => {
    const { offersModeView, isFetching, error } = state.offersStore;
    return { offersModeView, isFetching, error };
}

const mapDispatchToProps = (dispatch) => ({
    getOffers: () => dispatch(getOffers()),
    clearOffersList: () => dispatch(clearOffersList()),
    changeOffersModeView: (data) => dispatch(changeOffersModeView(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);
