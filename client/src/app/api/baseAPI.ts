import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";

const customBaseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:5001/api'
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const baseQueryWithErrorHandling = async(args: string | FetchArgs, api:BaseQueryApi, extraOptions: object) => {
    
    //Start Loading
    api.dispatch(startLoading());
    await sleep(1000); // Simulate network delay
    const result = await customBaseQuery(args, api, extraOptions);
    //Stop Loading
    api.dispatch(stopLoading());
    if (result.error) {
        // Handle error here, e.g., log it or show a notification
        const {status, data} = result.error;
        console.log(`Error status: ${status}, data: ${JSON.stringify(data)}`);
        console.error(result.error);
    }
    return result;
}