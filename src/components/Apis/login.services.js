import { PostRequest } from "./ApiMethods"
import { ErrorHandler } from "./Errorhandling"
import { Routes } from "./Routes"

export const loginUser = async (data) => {
    try {
        const result = await PostRequest({
            baseUrl:"https://reacttask.mkdlabs.com/v2/api",
            route: Routes.login, data, headers: {
                'Content-Type': 'application/json',
                'x-project': 'cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==',
            }
        })
        if(result?.status===200) {return result.data}
        throw result
    } catch (e) {
        ErrorHandler(e)
    }
}