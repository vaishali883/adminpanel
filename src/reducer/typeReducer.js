const initState = []

//Define Actions
export default (state = initState, action) => {
    switch (action.type) {
        case "typesData":
            return {
                typeData: action.payload
            }
        default:
            return {
                typeData: []
            }
    }
}
