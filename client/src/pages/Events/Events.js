import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import CreateEvent from '../../components/CreateEvent/CreateEvent';
import EventsTimer from '../../components/EventsTimer/EventsTimer';
import styles from './Events.module.sass';

const Events = (props) => {
    const { id } = props;

    const [eventData, setEventData] = useState();

    const needToUpdateEvents = (value) => {
        setEventData(value);
    }

    return (
        <>
            <Header />
            <div className={styles.eventsPageContainer}>
                <CreateEvent userId={id} needToUpdateEvents={needToUpdateEvents} />
                <EventsTimer userId={id} eventData={eventData} />
            </div>
        </>
    );
}


const mapStateToProps = (state) => {
    const { userStore: { data } } = state;
    return data;
};

export default connect(mapStateToProps)(Events)