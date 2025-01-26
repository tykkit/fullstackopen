const Message = ({ message }) => {
  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (!message) {
    return(null)
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )}


export default Message