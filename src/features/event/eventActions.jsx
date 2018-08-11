import { toastr } from 'react-redux-toastr';
import { FETCH_EVENTS } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { createNewEvent } from '../../app/common/util/helpers';
import { moment } from '../../../node_modules/moment';
import firebase from '../../app/config/firebase';

export const createEvent = (event) => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const user = firestore.auth().currentUser;
        const photoURL = getState().firebase.profile.photoURL;
        let newEvent = createNewEvent(user, photoURL, event);
        try {
            let createdEvent = await firestore.add(`events`, newEvent);
            await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
                eventId: createdEvent.id,
                userUid: user.uid,
                eventDate: event.date,
                host: true
            })
            toastr.success('Success!', 'Event has been created');
        }
        catch (error) {
            toastr.error('Oops!', 'Something went wrong');
        }
    }
}

export const updateEvent = (event) => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        if (event.date !== getState().firestore.ordered.events[0].date)
            event.date = moment(event.date).toDate();
        try {
            await firestore.update(`events/${event.id}`, event);
            toastr.success('Success!', 'Event has been updated');
        }
        catch (error) {
            toastr.error('Oops!', 'Something went wrong.');
        }
    }
}

export const cancelToggle = (cancelled, eventId) => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const message = cancelled ? 'Do you want to cancel event?' : 'Do you want to re-initiate the event?';
        try {
            toastr.confirm(message, {
                onOk: () => {
                    return firestore.update(`events/${eventId}`, {
                        cancelled: cancelled
                    })
                }
            })
        }
        catch (error) {
            console.log(error);
            toastr.error('Oops', 'Something went wrong');
        }
    }
}

export const getEventsForDashboard = lastEvent => async (dispatch, getState) => {
    let today = new Date(Date.now());
    const firestore = firebase.firestore();
    const eventsRef = firestore.collection('events');
    try {
        dispatch(asyncActionStart());
        let startAfter =
            lastEvent &&
            (await firestore
                .collection('events')
                .doc(lastEvent.id)
                .get());
        let query;

        lastEvent
            ? (query = eventsRef
                .where('date', '>=', today)
                .orderBy('date')
                .startAfter(startAfter)
                .limit(2))
            : (query = eventsRef
                .where('date', '>=', today)
                .orderBy('date')
                .limit(2));

        let querySnap = await query.get();

        if (querySnap.docs.length === 0) {
            dispatch(asyncActionFinish());
            return querySnap;
        }

        let events = [];

        for (let i = 0; i < querySnap.docs.length; i++) {
            let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
            events.push(evt);
        }
        dispatch({ type: FETCH_EVENTS, payload: { events } });
        dispatch(asyncActionFinish());
        return querySnap;
    } catch (error) {
        console.log(error);
        dispatch(asyncActionError());
    }
};
