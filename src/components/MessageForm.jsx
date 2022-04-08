import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';
//message form is used for creating and sending message
const MessageForm = (props) => {
  const [value, setValue] = useState('');//setting input value 
  const { chatId, creds } = props;//destructuring props

  const handleChange = (event) => {
    setValue(event.target.value);

    isTyping(props, chatId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = value.trim();//trimming the value of input and storing in text to send

    if (text.length > 0) {//only sends if length is >0 means not a non empty
      sendMessage(creds, chatId, { text });//it comes from chat engine that send three things 
    }

    setValue(''); //after sending message the value will become to null again 
  };

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' });//sending text and image together
  };

  return (//creating form and onsubmit handeler
    <form className="message-form" onSubmit={handleSubmit}> 
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;