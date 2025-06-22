import { apiSlice } from "./apiSlice"
import { TEAM_URL } from "../../utils/constant"

let teamSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTeam: builder.mutation({
            query: (data) => ({
                url: `${TEAM_URL}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Team"]
        }),
        updateTeamById: builder.mutation({
            query: ({ teamId, data }) => ({
                url: `${TEAM_URL}/${teamId}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Team"]
        }),
        deleteTeamById: builder.mutation({
            query: (id) => ({
                url: `${TEAM_URL}/${id}`,
                method: "DELETE",

            }),
            invalidatesTags: ["Team"]
        }),
        getTeamList: builder.query({
            query: () => ({
                url: `${TEAM_URL}`,
                method: "GET"
            }),
            providesTags: ["Team"]
        }),
        getTeamById: builder.query({
            query: (id) => ({
                url: `${TEAM_URL}/${id}`,
                method: "GET",
            }),
            providesTags: ["Team"]
        }),
        addMemberToTeam: builder.mutation({
            query: ({ teamId, userId }) => ({
                url: `${TEAM_URL}/add-member`,
                method: "POST",
                body: { teamId, userId }
            }),
            invalidatesTags: ["Team"]
        }),
        getMembersByTeamId: builder.query({
            query: (teamId) => ({
                url: `${TEAM_URL}/${teamId}/members`,
                method: "GET"
            }),
            providesTags: ["Team"]
        }),
        removeMemberFromTeamById: builder.mutation({
            query: ({ teamId, userId }) => ({
                url: `${TEAM_URL}/remove-member/${teamId}/${userId}`,
                method: "DELETE",

            }),
            invalidatesTags: ["Team"]
        })
    })
})

export const {
    useCreateTeamMutation,
    useUpdateTeamByIdMutation,
    useDeleteTeamByIdMutation,
    useAddMemberToTeamMutation,
    useGetMembersByTeamIdQuery,
    useRemoveMemberFromTeamByIdMutation,
    useGetTeamListQuery,
    useGetTeamByIdQuery,
} = teamSlice