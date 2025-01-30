import { useDispatch, useSelector } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => {
    if (state.notification) {
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
      return state.notification
    } 
  })

  const showNotification = !(notification)
    ? "none"
    : ""
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: showNotification
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification