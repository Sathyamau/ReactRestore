import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

const customBaseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:5001/api',
  credentials: 'include'
});

type ErrorResponse = string | { title: string } | {errors: string[]}

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
        //const {status, data} = result.error;
        //console.log(`Error status: ${status}, data: ${JSON.stringify(data)}`);
        console.log(result.error);

        const originalStatus = result.error.status === "PARSING_ERROR" && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status;

        const responseData = result.error.data as ErrorResponse;

    switch (originalStatus) {
        case 400:
            if(typeof responseData == 'string') toast.error(responseData)
            else if ('errors' in responseData)
              throw Object.values(responseData.errors).flat().join(',');
            else
               toast.error(responseData.title);                
            break;
        case 401:
            if(typeof responseData === "object" && "title" in responseData)
                toast.error(responseData.title as string);
            break;
        case 404:
            if(typeof responseData === "object" && "title" in responseData)
                 router.navigate('/not-found')
            break;
        case 500:
              if(typeof responseData == 'string') 
                router.navigate('/server-error', { state: { error: responseData } });
            break;
        default:
            break;
}

    }
    return result;
}