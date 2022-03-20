const initState = []

//Define Actions
export default (state = initState, action) => {
    switch (action.type) {
        case "userdata":
            return {
                userData: action.payload
            }
        default:
            return {
                userData: []
            }
    }
}
