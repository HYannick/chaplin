export const auth = ({ logged, role, userId, token, username }) => {
    return {
        logged,
        role,
        userId,
        token,
        username
    };
}