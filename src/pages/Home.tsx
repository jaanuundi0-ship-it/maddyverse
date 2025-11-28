import { useState, useEffect } from 'react';
import { Heart, Sun, Gamepad2, BookOpen, FileText } from 'lucide-react';

const Doodles = () => (
  <>
    <div className="absolute top-10 left-8 text-4xl animate-float">✨</div>
    <div className="absolute top-32 right-12 text-5xl animate-wobble">💫</div>
    <div className="absolute bottom-32 left-16 text-5xl animate-float" style={{ animationDelay: '1s' }}>🌸</div>
    <div className="absolute bottom-20 right-20 text-6xl animate-wobble" style={{ animationDelay: '0.5s' }}>💕</div>
    <div className="absolute top-1/3 right-10 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>⭐</div>
    <div className="absolute top-1/2 left-5 text-5xl animate-wobble" style={{ animationDelay: '0.8s' }}>🦋</div>
    <div className="absolute bottom-40 right-32 text-4xl animate-float" style={{ animationDelay: '2s' }}>💗</div>
    <div className="absolute top-1/4 left-1/3 text-6xl animate-spin-slow opacity-20">☀️</div>
    <div className="absolute bottom-1/3 right-1/4 text-5xl animate-float" style={{ animationDelay: '1.2s' }}>🌷</div>
    <div className="absolute top-2/3 right-1/3 text-4xl animate-wobble" style={{ animationDelay: '1.8s' }}>✨</div>
    <div className="absolute top-20 left-1/4 text-5xl animate-float" style={{ animationDelay: '0.3s' }}>😂</div>
    <div className="absolute bottom-1/4 left-1/3 text-5xl animate-wobble" style={{ animationDelay: '1.5s' }}>😭</div>
    <div className="absolute top-1/3 left-10 text-4xl animate-float" style={{ animationDelay: '2.2s' }}>💋</div>
    <div className="absolute bottom-10 left-1/2 text-5xl animate-wobble" style={{ animationDelay: '0.7s' }}>🥺</div>
    <div className="absolute top-2/3 left-1/4 text-4xl animate-float" style={{ animationDelay: '1.8s' }}>😳</div>
    <div className="absolute bottom-1/3 right-1/3 text-5xl animate-wobble" style={{ animationDelay: '2.5s' }}>😩</div>
    <div className="absolute top-1/2 right-20 text-6xl animate-float" style={{ animationDelay: '1.1s' }}>🦋</div>
    <div className="absolute top-1/4 right-1/3 text-5xl animate-wobble" style={{ animationDelay: '0.4s' }}>🕷️</div>
    <div className="absolute bottom-20 left-1/4 text-6xl animate-float" style={{ animationDelay: '2.8s' }}>❤️</div>
    <div className="absolute top-3/4 right-10 text-4xl animate-wobble" style={{ animationDelay: '1.3s' }}>😂</div>
    <div className="absolute bottom-1/2 right-1/4 text-5xl animate-float" style={{ animationDelay: '2.1s' }}>💋</div>
  </>
);

interface HomeProps {
  onNavigate: (page: 'journal' | 'arcade' | 'logbook' | 'poems' | 'paras') => void;
}

function Home({ onNavigate }: HomeProps) {
  const maddyBirthDate = new Date('2005-02-24');
  const bubLoveDate = new Date('2023-12-18');

  const [maddyDays, setMaddyDays] = useState(0);
  const [bubDays, setBubDays] = useState(0);
  const [heartAnimation, setHeartAnimation] = useState<{x: number, y: number, id: number}[]>([]);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date();
      const maddyMs = now.getTime() - maddyBirthDate.getTime();
      const bubMs = now.getTime() - bubLoveDate.getTime();

      setMaddyDays(Math.floor(maddyMs / (1000 * 60 * 60 * 24)));
      setBubDays(Math.floor(bubMs / (1000 * 60 * 60 * 24)));
    };

    calculateDays();
    const interval = setInterval(calculateDays, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  const handleCounterClick = (event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newHeart = { x, y, id: Date.now() };
    setHeartAnimation(prev => [...prev, newHeart]);
    setClickCount(prev => prev + 1);

    setTimeout(() => {
      setHeartAnimation(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
  };

  const getMessage = () => {
    if (clickCount % 2 === 1) return "Still not enough time!";
    return "My favorite deployment, always.";
  };

  const navigationItems = [
    {
      icon: Sun,
      title: "Sunshine Journal",
      onClick: () => onNavigate('journal'),
      color: 'from-yellow-200 to-orange-200',
      emoji: '☀️'
    },
    {
      icon: Gamepad2,
      title: "Madness Arcade",
      onClick: () => onNavigate('arcade'),
      color: 'from-pink-200 to-rose-200',
      emoji: '🎮'
    },
    {
      icon: BookOpen,
      title: "Lifephile Logbook",
      onClick: () => onNavigate('logbook'),
      color: 'from-green-200 to-teal-200',
      emoji: '📖'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-stone-100 relative overflow-hidden font-quicksand">
      <Doodles />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-rose-700 font-fredoka">
            Welcome to the Maddyverse
          </h1>
          <p className="text-2xl text-amber-900">
            A Universe Built on Madness, Life, and Bouncing Angels ✨
          </p>
        </header>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-rose-300">
            <h2 className="text-4xl font-bold text-center mb-12 text-rose-700 font-fredoka">
              The Love Counters 💕
            </h2>

            <div className="space-y-8">
              <div
                onClick={handleCounterClick}
                className="relative bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl p-8 cursor-pointer hover:scale-105 transition-transform duration-300 border-4 border-rose-300 shadow-lg overflow-hidden"
              >
                {heartAnimation.map(heart => (
                  <div
                    key={heart.id}
                    className="absolute pointer-events-none animate-ping"
                    style={{ left: heart.x, top: heart.y }}
                  >
                    <Heart className="text-pink-500 fill-pink-500" size={24} />
                  </div>
                ))}
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-rose-900 mb-3 font-fredoka">The Maddy Count</h3>
                  <p className="text-lg text-rose-700 mb-2 font-quicksand">Since 24 Feb 2005</p>
                  <p className="text-6xl font-bold text-rose-800 font-fredoka">{maddyDays.toLocaleString()}</p>
                  <p className="text-lg text-rose-700 mt-2 font-quicksand">Days She Has Blessed The World</p>
                </div>
              </div>

              <div
                onClick={handleCounterClick}
                className="relative bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-8 cursor-pointer hover:scale-105 transition-transform duration-300 border-4 border-amber-300 shadow-lg overflow-hidden"
              >
                {heartAnimation.map(heart => (
                  <div
                    key={heart.id}
                    className="absolute pointer-events-none animate-ping"
                    style={{ left: heart.x, top: heart.y }}
                  >
                    <Heart className="text-orange-500 fill-orange-500" size={24} />
                  </div>
                ))}
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-amber-900 mb-3 font-fredoka">The Bub Count</h3>
                  <p className="text-6xl font-bold text-amber-800 font-fredoka">{bubDays.toLocaleString()}</p>
                  <p className="text-lg text-amber-700 mt-2 font-quicksand">Days Hopelessly in Love with Maddy</p>
                </div>
              </div>
            </div>

            {clickCount > 0 && (
              <div className="mt-8 text-center animate-fade-in">
                <p className="text-2xl text-rose-600 font-semibold italic font-quicksand">
                  {getMessage()}
                </p>
              </div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => onNavigate('poems')}
              className="bg-gradient-to-r from-purple-200 to-pink-200 hover:from-purple-300 hover:to-pink-300 rounded-3xl p-8 border-4 border-white shadow-lg transition-all hover:shadow-2xl hover:scale-105"
            >
              <div className="flex flex-col items-center gap-3">
                <FileText className="text-purple-700" size={48} />
                <h3 className="text-2xl font-bold text-purple-900 font-fredoka">Poems 💜</h3>
                <p className="text-sm text-purple-700 font-quicksand">Words from my heart</p>
              </div>
            </button>
            <button
              onClick={() => onNavigate('paras')}
              className="bg-gradient-to-r from-blue-200 to-cyan-200 hover:from-blue-300 hover:to-cyan-300 rounded-3xl p-8 border-4 border-white shadow-lg transition-all hover:shadow-2xl hover:scale-105"
            >
              <div className="flex flex-col items-center gap-3">
                <FileText className="text-blue-700" size={48} />
                <h3 className="text-2xl font-bold text-blue-900 font-fredoka">Paragraphs 💙</h3>
                <p className="text-sm text-blue-700 font-quicksand">Thoughts & feelings</p>
              </div>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-rose-700 font-fredoka">
            The Bouncing Angel Navigation 🌙
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`bg-gradient-to-br ${item.color} rounded-3xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white shadow-lg group relative overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-10 text-8xl flex items-center justify-center font-fredoka pointer-events-none group-hover:animate-float">
                    {item.emoji}
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="bg-white/80 p-6 rounded-full group-hover:animate-bounce transform transition-transform shadow-md">
                      <Icon className="text-amber-900" size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-900 text-center font-fredoka">{item.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}

export default Home;
