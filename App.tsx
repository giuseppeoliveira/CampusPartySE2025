import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatScreen } from './components/ChatScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'chat'>('welcome');

  const handleStartChat = () => {
    setCurrentScreen('chat');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  return (
    <>
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStartChat={handleStartChat} />
      )}
      {currentScreen === 'chat' && (
        <ChatScreen onBackToWelcome={handleBackToWelcome} />
      )}
    </>
  );
}