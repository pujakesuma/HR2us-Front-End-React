const initialState = {
    id: '',
    name:'',
    photo:null,
    description:'',
    skill:'',
    location:'',
    dateOfBirth:'',
    expectedSalary:'',
    email:'',
    showcase:'',
    isDeleted: false,
    isError: false,
    isLoading: false,
    message: '',

}

const Profile = (state=initialState, action) => {
    switch(action.type){
        case "GET_ENGINEER_PENDING":
            case "DELETE_ENGINEER_PENDING":
                case "UPDATE_ENGINEER_PENDING":
                                return{
                                    ...state,
                                    isLoading: true,
                                    isError: false
                                }
        case "GET_ENGINEER_FULFILLED":
            let date = new Date(action.payload.data.response[0].date_of_birth)
            let dob = (date.getUTCMonth()+1) > 9 ?  date.getUTCFullYear()+'-'+(date.getUTCMonth()+1)+'-'+date.getUTCDate() :
            date.getUTCFullYear()+'-0'+(date.getUTCMonth()+1)+'-0'+date.getUTCDate()
            return{
                ...state,
                id: action.payload.data.response[0].id,
                name: action.payload.data.response[0].name,
                photo: action.payload.data.response[0].photo,
                description: action.payload.data.response[0].description,
                skill: action.payload.data.response[0].skill,
                location: action.payload.data.response[0].location,
                dateOfBirth: dob,
                expectedSalary: action.payload.data.response[0].expected_salary,
                email: action.payload.data.response[0].email,
                showcase: action.payload.data.response[0].showcase,
                isError: false,
                isLoading: false
            }
        case "GET_ENGINEER_REJECTED":
                return{
                    ...state,
                    isLoading: false,
                    isError: true
                }
        case "DELETE_ENGINEER_FULFILLED":
                return{
                    ...state,
                    isDeleted: true,
                    isLoading: false,
                    isError: false
                }
        case "DELETE_ENGINEER_REJECTED":
                return{
                    ...state,
                    isDeleted: false,
                    isLoading: false,
                    isError: true
                }
        case "UPDATE_ENGINEER_FULFILLED":
                return{
                    ...state,
                    isError: false,
                    isLoading: false,
                    message: 'Update Success!'
                }
        case "UPDATE_ENGINEER_REJECTED":
                return{
                    ...state,
                    isError: true,
                    isLoading: false,
                    message: 'Update Failed!'
                }
        default:
            return state
    }
}

export default Profile