import React, { useState } from 'react';
import Header      from './components/Header/Header';
import Hero        from './components/Hero/Hero';
import CBTChat     from './components/CBTChat/CBTChat';
import PHQ9        from './components/PHQ9/PHQ9';
import MoodTracker from './components/MoodTracker/MoodTracker';
import Footer      from './components/Footer/Footer';

const MENU = [
  { key: 'chat',  label: 'Микро-переключение' },
  { key: 'phq9',  label: 'PHQ-9' },
  { key: 'track', label: 'Трекер настроения' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <CBTChat />;
      case 'phq9':
        return <PHQ9 />;
      case 'track':
        return <MoodTracker />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Header
        userName="Diana St"
        menuItems={MENU}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === 'chat' ? (
        <Hero userName="Diana St">
          {renderContent()}
        </Hero>
      ) : (
        <main style={{ flex: 1, maxWidth: 800, margin: '20px auto', padding: '0 16px' }}>
          {renderContent()}
        </main>
      )}

      <Footer />
    </div>
  );
}
