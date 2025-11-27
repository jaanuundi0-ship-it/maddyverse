import { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, Plus, Check } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Todo {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  created_at: string;
}

interface LifephileLogbookProps {
  onBack: () => void;
}

const CATEGORIES = [
  { id: 'adventures', label: '🗺️ Adventures', color: 'from-blue-200 to-cyan-200' },
  { id: 'home', label: '🏠 Home', color: 'from-orange-200 to-yellow-200' },
  { id: 'trips', label: '✈️ Trips', color: 'from-purple-200 to-pink-200' },
  { id: 'memories', label: '💕 Memories', color: 'from-rose-200 to-pink-200' },
  { id: 'dreams', label: '✨ Dreams', color: 'from-amber-200 to-orange-200' }
];

function LifephileLogbook({ onBack }: LifephileLogbookProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('adventures');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert({
          text: newTodo,
          category: selectedCategory,
          completed: false
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setTodos([data, ...todos]);
        setNewTodo('');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !completed })
        .eq('id', id);

      if (error) throw error;
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !completed } : t));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return CATEGORIES.find(c => c.id === categoryId);
  };

  const groupedTodos = CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = todos.filter(t => t.category === cat.id);
    return acc;
  }, {} as Record<string, Todo[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 font-quicksand">
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all shadow-lg border-2 border-blue-300"
      >
        <ArrowLeft className="text-blue-900" size={24} />
      </button>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-2 font-fredoka">
            The Lifephile Logbook 📖
          </h1>
          <p className="text-xl text-blue-700">Adventures, dreams, and memories we'll create together</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-blue-300 p-8 mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 font-fredoka">Add to Our Story ✨</h2>

            <div className="mb-4">
              <label className="block text-blue-900 font-bold mb-3 font-fredoka">What adventure is calling?</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`py-2 px-3 rounded-full font-bold transition-all border-2 ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r ' + cat.color + ' border-white scale-105'
                        : 'bg-white border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="What are we dreaming of?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-400 bg-blue-50 font-quicksand"
              />
              <button
                onClick={addTodo}
                className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg"
              >
                <Plus size={24} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-blue-700">Loading your dreams...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {CATEGORIES.map((cat) => {
                const catTodos = groupedTodos[cat.id];
                if (catTodos.length === 0) return null;

                return (
                  <div key={cat.id}>
                    <h3 className="text-2xl font-bold text-blue-900 mb-4 font-fredoka">{cat.label}</h3>
                    <div className="space-y-3">
                      {catTodos.map((todo) => (
                        <div
                          key={todo.id}
                          className={`bg-gradient-to-r ${cat.color} rounded-2xl p-4 shadow-lg border-2 border-white flex items-center gap-4 group hover:shadow-xl transition-all ${
                            todo.completed ? 'opacity-60' : ''
                          }`}
                        >
                          <button
                            onClick={() => toggleTodo(todo.id, todo.completed)}
                            className={`flex-shrink-0 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center transition-all ${
                              todo.completed ? 'bg-white' : 'hover:bg-white/50'
                            }`}
                          >
                            {todo.completed && <Check className="text-blue-600" size={20} />}
                          </button>
                          <span
                            className={`flex-1 text-lg font-quicksand ${
                              todo.completed ? 'line-through text-blue-800' : 'text-blue-900 font-medium'
                            }`}
                          >
                            {todo.text}
                          </span>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-blue-900 hover:text-red-600"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {todos.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-blue-700 font-quicksand">
                    No adventures yet! Start dreaming... ✨
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LifephileLogbook;
