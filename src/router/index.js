import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import UserList from '@/components/users/admin/UserList';
import UserDetail from '@/components/users/UserDetail';
import UserEdit from '@/components/users/UserEdit';

import MovieList from '@/components/movies/MovieList';
import MovieCreate from '@/components/movies/MovieCreate';
import MovieEdit from '@/components/movies/MovieEdit';
import MovieDetail from '@/components/movies/MovieDetail';
import Infos from '@/components/Infos';
import Signin from '@/components/Auth';

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/signin', name: 'Signin', component: Signin },

        { path: '/users', name: 'Users', component: UserList, meta: { requiresAuth: true, requiresAdmin: true } },
        { path: '/users/:id', name: 'User', component: UserDetail, meta: { requiresAuth: true, requiresAdmin: false }, props: true },
        { path: '/users/:id/edit', name: 'UserEdit', component: UserEdit, meta: { requiresAuth: true, requiresAdmin: false } },

        { path: '/movies', name: 'Movies', component: MovieList },
        { path: '/movies/add', name: 'MovieCreate', component: MovieCreate, meta: { requiresAuth: true, requiresAdmin: true }, props: true },
        { path: '/movies/:id', name: 'Movie', component: MovieDetail, props: true },
        {
            path: '/movies/:id/edit',
            name: 'MovieEdit',
            component: MovieEdit,
            meta: { requiresAuth: true, requiresAdmin: true },
            props: true
        },

        { path: '/infos', name: 'Infos', component: Infos },
    ]
})