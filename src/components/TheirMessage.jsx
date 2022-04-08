const TheirMessage = ({ lastMessage, message }) => {//passibg two props
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username; //to check first message or not
  
    return (
      <div className="message-row">
        {isFirstMessageByUser && ( //if true
          <div //this is only for the first message of user or sender then we will show the avatar or pic
            className="message-avatar"
            style={{ backgroundImage: message.sender && `url(${message.sender.avatar})` }}
          />
        )}
        {message.attachments && message.attachments.length > 0//checking if message is image then run this
          ? (//if true
            <img
              src={message.attachments[0].file}
              alt="message-attachment"
              className="message-image"
              style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
            />
          )
          : (//if false then  text
            <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
              {message.text}
            </div>
          )}
      </div>
    );
  };
  
  export default TheirMessage;