export const auth = ({ logged, role, userId, subscribed, token }) => {
    return {
        logged,
        role,
        userId,
        token
    };
}