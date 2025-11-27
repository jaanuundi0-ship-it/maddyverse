import { useState, useEffect } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface SunshineJournalProps {
  onBack: () => void;
}

function SunshineJournal({ onBack }: SunshineJournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'The First Moment I Knew',
      content: 'There was something about your laugh that made everything feel right.',
      date: '2023-12-18'
    }
  ]);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  const addEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        title: newEntry.title,
        content: newEntry.content,
        date: new Date().toISOString().split('T')[0]
      };
      setEntries([entry, ...entries]);
      setNewEntry({ title: '', content: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 font-quicksand">
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all shadow-lg border-2 border-yellow-300"
      >
        <ArrowLeft className="text-amber-900" size={24} />
      </button>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-2 font-fredoka">
            The Sunshine Journal ☀️
          </h1>
          <p className="text-xl text-amber-700">Our most cherished memories, hand-bound with love</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-yellow-300 p-8 mb-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6 font-fredoka">Add a New Memory ✨</h2>
            <input
              type="text"
              placeholder="Memory title..."
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              className="w-full px-4 py-3 mb-4 border-2 border-yellow-200 rounded-2xl focus:outline-none focus:border-yellow-400 bg-yellow-50"
            />
            <textarea
              placeholder="Tell our story..."
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 mb-4 border-2 border-yellow-200 rounded-2xl focus:outline-none focus:border-yellow-400 bg-yellow-50 resize-none"
            />
            <button
              onClick={addEntry}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg font-fredoka text-lg"
            >
              Save This Memory 💝
            </button>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-amber-900 mb-6 font-fredoka">Our Memories</h2>
            {entries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => setSelectedEntry(selectedEntry === entry.id ? null : entry.id)}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-4 border-yellow-200 p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-102"
              >
                <div className="flex items-start gap-4">
                  <Heart className="text-orange-400 fill-orange-400 mt-2 flex-shrink-0" size={28} />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-amber-900 mb-2 font-fredoka">{entry.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{new Date(entry.date).toLocaleDateString()}</p>
                    {selectedEntry === entry.id && (
                      <p className="text-amber-800 leading-relaxed text-lg">{entry.content}</p>
                    )}
                    {selectedEntry !== entry.id && (
                      <p className="text-amber-700 line-clamp-2">{entry.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SunshineJournal;
