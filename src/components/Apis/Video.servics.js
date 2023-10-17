import { GetRequest, PostRequest } from "./ApiMethods"
import { ErrorHandler } from "./Errorhandling"
import { Routes } from "./Routes"
const token = localStorage.getItem('jwt')
export const getAllVideos = async (data={
    "payload": {},
    "page": 0,
    "limit": 10
}
) => {

    try {
        const result = await PostRequest({
            baseUrl:"https://reacttask.mkdlabs.com/v1/api",
            route: Routes.getVideos, data
            , headers: {
                'Authorization': `Bearer ${token}`,
                'x-project': 'cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==',
            }
        })
        if(result?.status===200) {return result.data}
        throw result
    } catch (e) {
        ErrorHandler(e)
    }
}