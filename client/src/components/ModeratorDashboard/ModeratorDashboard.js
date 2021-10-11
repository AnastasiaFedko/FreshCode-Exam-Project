import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { changeOffersModeView, clearOffersList, getOffers } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import styles from './ModeratorDashboard.module.sass';
import OffersTable from '../OffersTable/OffersTable';
import ModeratorOffers from '../ModeratorOffers/ModeratorOffers';

class ModeratorDashboard extends React.Component {

    tryToGetOffers = () => {
        this.props.clearOffersList();
        this.props.getOffers();
    };

    componentWillUnmount() {
        this.props.clearOffersList();
    }

    render() {
        const { offersModeView, changeOffersModeView } = this.props;
        this.props.getOffers();
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
                <div className={styles.offersContainer}>
                    {
                        offersModeView === CONSTANTS.OFFERS_INFO_MODE
                            ? <ModeratorOffers />
                            : <OffersTable />
                    }
                </div>
            </div>);
    }
}

const mapStateToProps = (state) => {
    const { offersModeView } = state.offersStore;
    return { offersModeView };
}

const mapDispatchToProps = (dispatch) => ({
    getOffers: () => dispatch(getOffers()),
    clearOffersList: () => dispatch(clearOffersList()),
    changeOffersModeView: (data) => dispatch(changeOffersModeView(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);
