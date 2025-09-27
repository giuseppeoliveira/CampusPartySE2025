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

  // Debug: Adicionando um indicador para testar se a aplicação carrega
  console.log('App component loaded, current screen:', currentScreen);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStartChat={handleStartChat} />
      )}
      {currentScreen === 'chat' && (
        <ChatScreen onBackToWelcome={handleBackToWelcome} />
      )}
    </div>
  );
}