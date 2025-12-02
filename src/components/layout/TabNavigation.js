import React from 'react';
import './TabNavigation.css';

function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'bayt-elite', label: 'Bayt Elite', icon: '🏠' },
    { id: 'tawasul-ai', label: 'Tawasul AI', icon: '🤖' },
    { id: 'zimam-delivery', label: 'Zimam Delivery', icon: '🚚' },
    { id: 'al-multaqa', label: 'Al-Multaqa', icon: '📊' }
  ];

  return (
    <div className="tab-navigation">
      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TabNavigation;
