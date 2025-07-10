import { apiSlice } from "./apiSlice";
import { DASHBOARD_URL } from "../../utils/constant";

let dashboardSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminDashboardData: builder.query({
            query: () => ({
                url: `${DASHBOARD_URL}`,
                method: "GET",
            }),
            providesTags: ["Dashboard"]
        })
    })
})

export const { useGetAdminDashboardDataQuery } = dashboardSlice