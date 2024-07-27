export const RoutesAndPermissions = {
    admin: {
        login: ["post"],
        signup: ["post"],
        users: ["get", "post", "patch", "delete"],
        tasks: ["get", "post", "patch", "delete"],
    },
    user: {
        login: ["post"],
        signup: ["post"],
        users: [],
        tasks: ["get", "post", "patch", "delete"],
    },
};
