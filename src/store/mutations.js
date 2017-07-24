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

export const checkSub = (state, payload) => {
    state.subscribed = payload;
}

export const token = (state, payload) => {
    state.token = payload;
}