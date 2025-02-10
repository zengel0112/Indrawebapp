export const getUser = () => {
    let user = localStorage.getItem("user");

    if (!user) {
        return { role: "user" };
    }

    try {
        return JSON.parse(user);
    } catch (error) {
        console.error("Error parsing user data:", error);
        return { role: "user" };
    }
};

export const isAdmin = () => {
    return getUser().role === "admin";
};
