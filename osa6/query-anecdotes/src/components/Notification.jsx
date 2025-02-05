import { useNotificationDispatch, useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const value = useNotificationValue()
  const dispatch = useNotificationDispatch()
  console.log(value)

  if (value) {
    setTimeout(() => {
      dispatch({ type: 'RESET'})
    }, 5000)
  }

  if (!value) {
    return null
  }
  return (
    <div style={style}>
      {value}
    </div>
  )
}

export default Notification
