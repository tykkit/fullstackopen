import { useNotificationDispatch, useNotificationValue } from '../reducers/NotificationContext'
import { Alert } from 'react-bootstrap'

const Message = () => {
  const message = useNotificationValue()
  const dispatch = useNotificationDispatch()

  if (!message) {
    return null
  }

  if (message) {
    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, 5000)
  }

  const styleIfError = !message.isError
    ? 'success'
    : 'danger'

  return (
    <Alert variant={styleIfError} className="message">
      {message.message}
    </Alert>
  )
}

export default Message
