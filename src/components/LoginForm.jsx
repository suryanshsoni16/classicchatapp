import { useState } from 'react';
import axios from 'axios';  //for making Api call 

const projectID = '608b7bdc-b6c0-45d0-8aa9-39634f693ac9';//key given by the chat engine

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    //username , password are sent to chat engine and checks start messeging
    //on successful login api call
    //on failed show error
    const authObject = {'Project-ID':projectID,'User-Name':username,'User-Secret':password};//data authentication from chat engine

    try {
      await axios.get('https://api.chatengine.io/chats',{headers:authObject});

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('Oops, incorrect credentials.');
    }
  };

  return (//creating user form 
    <div className="wrapper">
      <div className="form">
        <h1 className="title">ClassicChatApp</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default LoginForm;