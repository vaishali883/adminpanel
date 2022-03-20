const initState = []

//Define Actions
export default (state = initState, action) => {
    switch (action.type) {
        case "artistData":
            return {
                artistData: action.payload
            }
        default:
            return {
                artistData: []
            }
    }
}
