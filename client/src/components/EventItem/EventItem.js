import React, { useEffect, useRef } from "react";
import styles from './EventItem.module.sass';
import moment from 'moment';
import { toast } from 'react-toastify';

const EventItem = (props) => {
    const {
        eventName,
        eventStart,
        eventNotification,
        eventId,
        userId,
        updateEvents } = props;

    const itemRef = useRef();

    const turnOnNotification = () => {
        itemRef.current.classList.add(styles.notification);
        toast.error(`Notification: event ${eventName} is coming soon!`)
    }

    const removeEvent = () => {

        const userEvents = JSON.parse(localStorage.getItem(`${userId}`));
        const index = userEvents.findIndex(event => event.eventId === eventId);
        if (index >= 0) {
            userEvents.splice(index, 1);
            localStorage.setItem(`${userId}`, JSON.stringify(userEvents));
        }
        updateEvents();
    }

    useEffect(() => {
        const diffNotification = moment(eventNotification).diff(moment());
        const timerNotification = setTimeout(turnOnNotification, diffNotification);

        return () => {
            clearTimeout(timerNotification);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <li ref={itemRef} className={styles.eventItemContainer}>
            <div className={styles.eventItemBody}>
                <div className={styles.eventItemTitle}>{eventName}</div>
                <span>{moment(eventStart).format('DD MMM YYYY HH:mm')}</span>
            </div>
            <button onClick={removeEvent}>Delete</button>
        </li>
    );
}

export default EventItem;