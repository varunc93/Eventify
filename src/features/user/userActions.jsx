import moment from 'moment';
import { toastr } from 'react-redux-toastr';

export const updateProfile = (user) =>
    async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const { isLoaded, isEmpty, ...updatedUser} = user;
        if (updatedUser.dateOfBirth && updatedUser.dateOfBirth._isAMomentObject) {
            updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate()
        }
        try {
            await firebase.updateProfile(updatedUser);
            toastr.success('Success!', 'Profile has been updated.');
        }
        catch(error){
            console.log(error);
        }
    }