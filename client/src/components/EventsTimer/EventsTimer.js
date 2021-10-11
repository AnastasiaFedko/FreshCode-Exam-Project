import React, { useEffect, useState } from "react";
import EventItem from "../EventItem/EventItem";
import styles from './EventsTimer.module.sass';

const EventsTimer = (props) => {

    const { userId, eventData } = props;

    const [events, setEvents] = useState([]);

    const updateEvents = () => {
        setEvents(getEvents());
    }

    useEffect(() => {
        if (eventData) {
            let userEvents = JSON.parse(localStorage.getItem(`${userId}`));
            if (userEvents) {
                userEvents.push(eventData);
            } else {
                userEvents = [eventData];
            }
            localStorage.setItem(`${userId}`, JSON.stringify(userEvents));
        }
        setEvents(getEvents());
    }, [eventData])


    const getEvents = () => {
        const eventsList = [];
        const userEvents = JSON.parse(localStorage.getItem(`${userId}`));
        if (userEvents && userEvents.length > 0) {
            userEvents.sort((a, b) => new Date(a.eventStart) - new Date(b.eventStart))
            for (const event of userEvents) {
                eventsList.push(
                    <EventItem
                        key={event.eventId}
                        updateEvents={updateEvents}
                        userId={userId}
                        eventId={event.eventId}
                        eventName={event.eventName}
                        eventStart={event.eventStart}
                        eventNotification={event.eventNotification} />)
            }
        }
        return eventsList;
    }

    return (
        <div className={styles.eventListContainer}>            
            <div>cheduled Events<span>{' '}<i className="fas fa-stopwatch"></i></span></div>
            {(events.length === 0) && <p> No scheduled events</p>}
            <ul>
                {events}
            </ul>
        </div>

    );
}

export default EventsTimer;