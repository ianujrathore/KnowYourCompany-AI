import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';
import InputBox from './InputBox';
import Sources from './Sources';
import WelcomeMessage from './WelcomeMessage';
import { sendMessage } from '../../utils/api';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sources, setSources] = useState([]);
  const [typingTimer, setTypingTimer] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message) => {
    const userMessage = {
      id: Date.now(),
      text: message,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setSources([]);

    try {
      const response = await sendMessage(message);
      
      // Add AI message with empty text first
      const aiMessage = {
        id: Date.now() + 1,
        text: '',
        isUser: false,
        isTyping: true,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Simulate typing effect
      const fullText = response.answer || 'No response received.';
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setMessages((prev) => {
            const updated = [...prev];
            const lastMessage = updated[updated.length - 1];
            if (lastMessage && !lastMessage.isUser) {
              lastMessage.text = fullText.substring(0, currentIndex + 1);
            }
            return updated;
          });
          currentIndex++;
        } else {
          clearInterval(interval);
          setMessages((prev) => {
            const updated = [...prev];
            const lastMessage = updated[updated.length - 1];
            if (lastMessage && !lastMessage.isUser) {
              lastMessage.isTyping = false;
            }
            return updated;
          });
          setTypingTimer(null);
        }
      },0.5);

      setTypingTimer(interval);
      
      if (response.sources && response.sources.length > 0) {
        setSources(response.sources);
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, something went wrong. Please try again.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!isLoading) {
      handleSend(suggestion);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc]">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 max-w-4xl mx-auto w-full scrollbar-custom"
      >
        <div className="min-h-full flex flex-col justify-center">
          {!hasMessages ? (
            <WelcomeMessage onSuggestionClick={handleSuggestionClick} />
          ) : (
            <div className="space-y-2 pb-4">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <MessageBubble 
                    message={msg.text} 
                    isUser={msg.isUser} 
                    isTyping={msg.isTyping} 
                  />
                  {!msg.isUser && msg.id === messages[messages.length - 1]?.id && sources.length > 0 && (
                    <div className="ml-12">
                      <Sources sources={sources} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-[#e2e8f0] bg-white px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <InputBox onSend={handleSend} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Chat;