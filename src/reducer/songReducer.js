const initState = []

//Define Actions
export default (state = initState, action) => {
    switch (action.type) {
        case "songData":
            return {
                songData: action.payload
            }
        default:
            return {
                songData: []
            }
    }
}
