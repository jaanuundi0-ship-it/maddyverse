import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Sparkles } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Paragraph {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface ParagraphsProps {
  onBack: () => void;
}

function Paragraphs({ onBack }: ParagraphsProps) {
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);
  const [newPara, setNewPara] = useState({ title: '', content: '' });
  const [selectedPara, setSelectedPara] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchParagraphs();
  }, []);

  const fetchParagraphs = async () => {
    try {
      const { data, error } = await supabase
        .from('paragraphs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setParagraphs(data || []);
    } catch (error) {
      console.error('Error fetching paragraphs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addParagraph = async () => {
    if (!newPara.title.trim() || !newPara.content.trim()) return;

    try {
      const { data, error } = await supabase
        .from('paragraphs')
        .insert({
          title: newPara.title,
          content: newPara.content
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setParagraphs([data, ...paragraphs]);
        setNewPara({ title: '', content: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding paragraph:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-100 font-quicksand">
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all shadow-lg border-2 border-blue-300"
      >
        <ArrowLeft className="text-blue-900" size={24} />
      </button>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-700 mb-2 font-fredoka">
            Paragraphs 💙
          </h1>
          <p className="text-xl text-blue-600">Thoughts and feelings from my heart</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-gradient-to-r from-blue-300 to-cyan-300 hover:from-blue-400 hover:to-cyan-400 rounded-3xl p-6 shadow-lg border-4 border-white transition-all hover:shadow-2xl hover:scale-102 flex items-center justify-center gap-3 mb-8"
            >
              <Plus className="text-blue-900" size={32} />
              <span className="text-2xl font-bold text-blue-900 font-fredoka">Write Your Thoughts</span>
            </button>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-blue-300 p-8 mb-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 font-fredoka">Share Your Thoughts 💭</h2>
              <input
                type="text"
                placeholder="Title..."
                value={newPara.title}
                onChange={(e) => setNewPara({ ...newPara, title: e.target.value })}
                className="w-full px-4 py-3 mb-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-400 bg-blue-50"
              />
              <textarea
                placeholder="Your thoughts..."
                value={newPara.content}
                onChange={(e) => setNewPara({ ...newPara, content: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 mb-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-400 bg-blue-50 resize-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={addParagraph}
                  className="flex-1 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg font-fredoka text-lg"
                >
                  Save 💙
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
              <p className="text-lg text-blue-700">Loading thoughts...</p>
            </div>
          ) : paragraphs.length === 0 ? (
            <div className="text-center py-12 bg-white/60 rounded-3xl">
              <p className="text-lg text-blue-700">No paragraphs yet. Share your thoughts! 💙</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paragraphs.map((para) => (
                <div
                  key={para.id}
                  onClick={() => setSelectedPara(selectedPara === para.id ? null : para.id)}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-4 border-blue-200 p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-102 group"
                >
                  <div className="flex items-start gap-4">
                    <Sparkles className="text-blue-400 mt-2 flex-shrink-0 group-hover:scale-110 transition-transform" size={28} />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-blue-900 mb-2 font-fredoka">{para.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{new Date(para.created_at).toLocaleDateString()}</p>
                      {selectedPara === para.id && (
                        <p className="text-blue-800 leading-relaxed text-lg whitespace-pre-wrap">{para.content}</p>
                      )}
                      {selectedPara !== para.id && (
                        <p className="text-blue-700 line-clamp-3">{para.content}</p>
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

export default Paragraphs;
