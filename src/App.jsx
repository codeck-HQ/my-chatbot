import { useState, useEffect, useRef } from 'react';

function App() {
  const chatBoxRef = useRef(null);             // Chat container reference for scrolling
  const [botTyping, setBotTyping] = useState(false); // Shows "typing..." when bot responds
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: 'user' },
    { text: 'Hi! I am a bot 🤖', sender: 'bot' }
  ]); // Stores all chat messages
  const [inputText, setInputText] = useState(''); // Stores current input

  // Store recent user messages to avoid repeating bot replies
  const recentMessages = useRef([]);

  // Bot response logic
const getBotReply = (userText) => {
  const text = userText.toLowerCase().trim();

  const responses = {
    hello: ["Hello there! 😃", "Hi! How’s it going?", "Hey! Nice to see you! 👋", "Yo! What’s up?"],
    how: ["I'm doing great, thanks! 😎", "All good here!", "Fantastic!", "Feeling awesome!"],
    chill: ["Nice! I’m just hanging out too.", "Cool! What else are you doing?", "Sounds relaxing! 🌴", "Ah, just vibing."],
    research: ["I can’t browse yet, but I can chat!", "I can help answer questions.", "I can give you info I know!", "Let’s explore the topic together!"],
    food: ["Yum! What’s your favorite dish?", "I love talking about food 🍕", "Cooking or ordering in?"],
    music: ["I love music too! 🎵", "What’s your favorite genre?", "Ever tried making music yourself?"],
    movies: ["I’m a big fan of movies! 🍿", "What’s the last movie you watched?", "Action, comedy, or drama?"],
    travel: ["Traveling is exciting! ✈️", "Do you like beaches or mountains?", "Any favorite country?"],
    sports: ["I enjoy sports too! ⚽", "Which sport do you follow?", "Team or solo activities?"],
    hobby: ["Hobbies are fun! 🎨", "What’s keeping you busy these days?", "Ever tried something new recently?"]
  };

  for (const key in responses) {
    if (text.includes(key)) {
      const options = responses[key];
      return options[Math.floor(Math.random() * options.length)];
    }
  }

  const fallback = [
    "Hmm, interesting! Tell me more.",
    "I see. Go on...",
    "Oh really? I’m curious! 🤔",
    "Wow! That’s cool 😎",
    "That sounds fun! Can you explain more?",
    "Interesting, tell me why you think that.",
    "Haha, okay! 😄"
  ];

  return fallback[Math.floor(Math.random() * fallback.length)];
};


  // Send message function
  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setBotTyping(true);

    // Random typing delay between 500ms and 1200ms
    const delay = Math.random() * 700 + 500;

    setTimeout(() => {
      const botMessage = { text: getBotReply(userMessage.text), sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
      setBotTyping(false);
    }, delay);
  };

  // Scroll chat to bottom on new messages
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Send on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">My Chatbot 🤖</h1>

      {/* Chat box */}
      <div
        ref={chatBoxRef}
        className="w-full max-w-md h-96 bg-gray-900 rounded-lg p-4 overflow-y-auto flex flex-col space-y-2"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === 'user'
              ? 'self-end bg-blue-600 px-3 py-2 rounded-lg max-w-xs break-words'
              : 'self-start bg-gray-700 px-3 py-2 rounded-lg max-w-xs break-words'
            }
          >
            {msg.text}
          </div>
        ))}

        {botTyping && (
          <div className="self-start text-sm text-gray-400 italic">
            typing...
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="w-full max-w-md flex gap-2 mt-4">
        <input
          className="flex-1 px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
