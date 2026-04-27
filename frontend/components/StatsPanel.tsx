import React from 'react';

interface StatsPanelProps {
  stats: { happy: number; sad: number; neutral: number; angry: number; };
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const items = [
    { label: 'Happy', count: stats.happy, emoji: '😊' },
    { label: 'Neutral', count: stats.neutral, emoji: '😐' },
    { label: 'Sad', count: stats.sad, emoji: '😢' },
    { label: 'Angry', count: stats.angry, emoji: '😡' },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
      <h2 className="text-xl font-medium text-black mb-6 tracking-tight">Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.label} className="bg-gray-50 p-6 rounded-2xl border border-gray-50 flex flex-col items-center justify-center transition-all hover:border-gray-200">
            <span className="text-3xl font-light text-black mb-1">{item.count}</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;