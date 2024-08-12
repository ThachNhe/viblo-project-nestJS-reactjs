// Action Creators
import actionType from './actionType';
import * as services from '../../services/index';
export const getAllUserAction = () => {
    return async (dispatch) => {
        try {
            const users = await services.getUsers();
            dispatch({
                type: actionType.GET_ALL_USER,
                payload: users,
            });
        } catch (error) {
            console.error('err from get all users:', error);
        }
    };
};
