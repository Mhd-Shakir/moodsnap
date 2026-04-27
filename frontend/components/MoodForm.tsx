import React, { useState } from 'react';

interface MoodFormProps {
  onSuccess: (mood: string, note: string) => void;
  isSubmitting: boolean;
}

const MoodForm: React.FC<MoodFormProps> = ({ onSuccess, isSubmitting }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy' },
    { id: 'neutral', emoji: '😐', label: 'Neutral' },
    { id: 'sad', emoji: '😢', label: 'Sad' },
    { id: 'angry', emoji: '😡', label: 'Angry' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood) {
      onSuccess(selectedMood, note);
      setSelectedMood(null);
      setNote('');
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
      <h2 className="text-xl font-medium text-black mb-6 tracking-tight">How are you feeling?</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-4 gap-4">
          {moods.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedMood(m.id)}
              className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 ${
                selectedMood === m.id
                  ? 'border-black bg-black text-white scale-105'
                  : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-300 hover:bg-white'
              }`}
            >
              <span className={`text-3xl mb-2 grayscale ${selectedMood === m.id ? 'grayscale-0' : ''}`}>
                {m.emoji}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold">{m.label}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your thoughts..."
            className="w-full p-0 bg-transparent border-b border-gray-200 focus:border-black transition-colors min-h-[80px] text-gray-800 resize-none outline-none text-sm py-2"
          />
        </div>

        <button
          type="submit"
          disabled={!selectedMood || isSubmitting}
          className="w-full py-4 bg-black text-white rounded-2xl font-semibold text-sm hover:bg-gray-900 disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-[0.98] uppercase tracking-widest"
        >
          {isSubmitting ? 'Recording...' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
};

export default MoodForm;