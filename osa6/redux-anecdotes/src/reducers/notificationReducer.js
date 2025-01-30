import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    voteNotification(state, action) {
      console.log(action)
      const voteString = `you voted ${action.payload}`
      return voteString
    },
    addAnecdoteNotification(state, action) {
      const addString = `you added ${action.payload}`
      return addString
    },
    resetNotification(state, action) {
      return null
    }
  }
})

export const { voteNotification, addAnecdoteNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer