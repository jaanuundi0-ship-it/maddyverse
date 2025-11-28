import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Heart } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Poem {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface PoemsProps {
  onBack: () => void;
}

function Poems({ onBack }: PoemsProps) {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [newPoem, setNewPoem] = useState({ title: '', content: '' });
  const [selectedPoem, setSelectedPoem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPoems();
  }, []);

  const fetchPoems = async () => {
    try {
      const { data, error } = await supabase
        .from('poems')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPoems(data || []);
    } catch (error) {
      console.error('Error fetching poems:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPoem = async () => {
    if (!newPoem.title.trim() || !newPoem.content.trim()) return;

    try {
      const { data, error } = await supabase
        .from('poems')
        .insert({
          title: newPoem.title,
          content: newPoem.content
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setPoems([data, ...poems]);
        setNewPoem({ title: '', content: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding poem:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100 font-quicksand">
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all shadow-lg border-2 border-purple-300"
      >
        <ArrowLeft className="text-purple-900" size={24} />
      </button>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-700 mb-2 font-fredoka">
            Poems 💜
          </h1>
          <p className="text-xl text-purple-600">Words from my heart to yours</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-gradient-to-r from-purple-300 to-pink-300 hover:from-purple-400 hover:to-pink-400 rounded-3xl p-6 shadow-lg border-4 border-white transition-all hover:shadow-2xl hover:scale-102 flex items-center justify-center gap-3 mb-8"
            >
              <Plus className="text-purple-900" size={32} />
              <span className="text-2xl font-bold text-purple-900 font-fredoka">Write a New Poem</span>
            </button>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-purple-300 p-8 mb-8">
              <h2 className="text-2xl font-bold text-purple-900 mb-6 font-fredoka">Create a Poem 💝</h2>
              <input
                type="text"
                placeholder="Poem title..."
                value={newPoem.title}
                onChange={(e) => setNewPoem({ ...newPoem, title: e.target.value })}
                className="w-full px-4 py-3 mb-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 bg-purple-50"
              />
              <textarea
                placeholder="Your poem..."
                value={newPoem.content}
                onChange={(e) => setNewPoem({ ...newPoem, content: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 mb-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 bg-purple-50 resize-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={addPoem}
                  className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg font-fredoka text-lg"
                >
                  Save Poem 💕
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-full transition-all shadow-lg font-fredoka"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-purple-700">Loading poetry...</p>
            </div>
          ) : poems.length === 0 ? (
            <div className="text-center py-12 bg-white/60 rounded-3xl">
              <p className="text-lg text-purple-700">No poems yet. Start creating! 💜</p>
            </div>
          ) : (
            <div className="space-y-4">
              {poems.map((poem) => (
                <div
                  key={poem.id}
                  onClick={() => setSelectedPoem(selectedPoem === poem.id ? null : poem.id)}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-4 border-purple-200 p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-102 group"
                >
                  <div className="flex items-start gap-4">
                    <Heart className="text-purple-400 fill-purple-400 mt-2 flex-shrink-0 group-hover:scale-110 transition-transform" size={28} />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-purple-900 mb-2 font-fredoka">{poem.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{new Date(poem.created_at).toLocaleDateString()}</p>
                      {selectedPoem === poem.id && (
                        <p className="text-purple-800 leading-relaxed text-lg whitespace-pre-wrap">{poem.content}</p>
                      )}
                      {selectedPoem !== poem.id && (
                        <p className="text-purple-700 line-clamp-3">{poem.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Poems;
