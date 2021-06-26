export const statusStyle = (userStatus) => {
        return {borderColor: userStatus === 3 ? "green" : userStatus === 2 ? "crimson" : "white",}
    }