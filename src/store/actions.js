import Services from '../services';
import { Notification } from 'element-ui';

export const login = ({ commit }, payload) => {
    Services.auth.signin(payload)
        .then(res => {
            // - Save the JWT Token
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.user.role);
            localStorage.setItem('user', res.data.user._id);
            localStorage.setItem('username', res.data.user.username);
            Notification({
                title: `Bienvenue, ${res.data.user.username || 'Utilisateur'}`,
                message: '',
                type: 'success'
            });
            commit('granted', res.data.user._id);
            commit('role', res.data.user.role);
            commit('token', res.data.token);
            commit('username', res.data.user.username);
        })
        .catch(err => {
            Notification({
                title: 'Erreur',
                message: 'Accès refusé',
                type: 'error'
            });
        });

};


export const logout = ({ commit }) => {
    commit('denied');
    localStorage.clear();
};