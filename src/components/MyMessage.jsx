const MyMessage = ({ message }) => {//passing only one prop
    if (message.attachments && message.attachments.length > 0) {//checking whether the message is any attacahment or image
      return (//if it is image then return image
        <img
          src={message.attachments[0].file}//image accesories
          alt="message-attachment"
          className="message-image"
          style={{ float: 'right' }}
        />
      );
    }
  
    return (//if the message is not image then it will return text 
      <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50' }}>
        {message.text}
      </div>
    );
  };
  
  export default MyMessage;