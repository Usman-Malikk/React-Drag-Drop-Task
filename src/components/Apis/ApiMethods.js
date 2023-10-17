// import axios from '../../Config/config'
import axios from "axios"
// import { server } from "../../Config/config"

//Get Request
export const GetRequest = async (info) => {
    const { route, headers = {}, dispatch } = info
    const result = await axios.get("https://reacttask.mkdlabs.com/v2/api"+ route, headers)
    if (result.status === 200) {
        return result
    }
    else {
        throw result
    }
}
//Post Request Video
export const PostRequest = async (info) => {
    const { baseUrl,route, data, headers , dispatch } = info
    const result = await axios.post(baseUrl+route, data, {headers})
    if (result.status === 200) {
        return result
    }
    else {
        throw result
    }
}

//Post Request Video
export const Check = async (info) => {
    const { route, data, headers , dispatch } = info
    const result = await axios.post(route, data, {headers})
    if (result.status === 200) {
        return result
    }
    else {
        throw result
    }
}



