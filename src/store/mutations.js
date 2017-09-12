export const granted = (state, payload) => {
    state.logged = true;
    state.userId = payload;
};
export const denied = state => {
    state.logged = false;
    state.userId = "";
};
export const role = (state, payload) => {
    state.role = payload;
}

export const username = (state, payload) => {
    state.username = payload;
}

export const token = (state, payload) => {
    state.token = payload;
}