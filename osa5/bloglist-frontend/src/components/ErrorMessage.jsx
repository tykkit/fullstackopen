const ErrorMessage = ({ message }) => {
  const messageStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if (!message) {
    return null
  }

  return (
    <div style={messageStyle} className="error">
      {message}
    </div>
  )
}

export default ErrorMessage
