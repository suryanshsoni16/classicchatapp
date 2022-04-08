import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;//chat feed component is provided by chat engine it returns many props
  //console.log(props)//to check 

  const chat = chats && chats[activeChat];//checking condition of chats is activechat or not
  //console.log(chat)

  const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (  //every message(chat) is givn unique id we are iterating through it also 
  //checking if person's last message is==mesage id or not       it checks who read the last message 
  //checks who read the mesasage
    <div
      key={`read_${index}`}//key is react property index is returned by map when iterating through list
      className="read-receipt"
      style={{//inline styling
        float: isMyMessage ? 'right' : 'left',//if it your message then it appear on right if its their messahe then on left
        backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
      }}
    />
  ));

  const renderMessages = () => {//updating messages
    const keys = Object.keys(messages);//creating object it is object constructor

    return keys.map((key, index) => {//loop in keys 
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];// to display last message 
      const isMyMessage = userName === message.sender.username;//checking if username is = to sender username then it is your message

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className="message-block">
            {isMyMessage
              ? <MyMessage message={message} />
              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
          </div>
          <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return <div />;

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;