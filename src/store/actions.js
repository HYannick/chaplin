import Services from '../services/services';
import { Notification } from 'element-ui';

export const login = ({ commit }, payload) => {
    Services.signin(payload)
        .then(res => {
            console.log(res);
            // - Save the JWT Token
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.user.role);
            localStorage.setItem('user', res.data.user._id);
            Notification({
                title: 'Success',
                message: `Bienvenue, petit(e)!`,
                type: 'success'
            });
            commit('granted', res.data.user._id);
            commit('role', res.data.user.role);
            commit('token', res.data.token);
        })
        .catch(err => {
            Notification({
                title: 'Error',
                message: 'err',
                type: 'error'
            });
        });

};


export const logout = ({ commit }) => {
    commit('denied');
    localStorage.clear();
};

export const checkSubscription = ({ commit }, payload) => {
    const { movieId, userId } = payload;
    Services.getMovie(movieId)
        .then(res => {
            const { volunteers } = res.data
            if (volunteers.indexOf(userId) !== -1) {
                commit('checkSub', true);
            } else {
                commit('checkSub', false);
            }
        })
}