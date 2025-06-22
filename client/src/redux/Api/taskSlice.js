import { apiSlice } from '../Api/apiSlice'
import { TASK_URL } from '../../utils/constant'

let taskSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Tasks']
        }),
        getTasksListById: builder.query({
            query: (moduleId) => ({
                url: `${TASK_URL}/${moduleId}`,
                method: 'GET'
            }),
            providesTags: ['Task']
        }),
        updateTaskById: builder.mutation({
            query: ({ taskId, data }) => ({
                url: `${TASK_URL}/${taskId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Tasks']
        }),
        deleteTaskById: builder.mutation({
            query: (moduleId) => ({
                url: `${TASK_URL}/${moduleId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Tasks']
        }),
        taskAssignedToUser: builder.mutation({
            query: (userId, data) => ({
                url: `${TASK_URL}/${userId}`,
                method: 'POST', // <-- Specify the HTTP method here
                body: data
            }),
            invalidatesTags: ['Tasks']
        })
    })
})

export const {
    useCreateTaskMutation,
    useGetTasksListByIdQuery,
    useDeleteTaskByIdMutation,
    useUpdateTaskByIdMutation,
    useTaskAssignedToUserMutation
} = taskSlice
