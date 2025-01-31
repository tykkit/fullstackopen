import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    replaceNotification(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return null
    }
  }
})

export const { replaceNotification, resetNotification } = notificationSlice.actions

export const setNotification = (notification, timer) => {
  return async dispatch => {
    dispatch(replaceNotification(notification))
    setTimeout(() => {
      dispatch(resetNotification())
    }, timer * 1000)
  }
}

export default notificationSlice.reducer