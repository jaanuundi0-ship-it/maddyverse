import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface MadnessArcadeProps {
  onBack: () => void;
}

const NICKNAMES = [
  { name: 'Maddy', message: "You're madly cute, madly mine, and my favorite kind of madness." },
  { name: 'Little Angel', message: "You light up my world in ways I never thought possible. 🌟" },
  { name: 'Lifephile', message: "My life was grayscale until you came along. Thank you for the color. 🎨" },
  { name: 'Madness', message: "You're my favorite kind of beautiful chaos. Forever and always. 💫" },
  { name: 'Morning Sunshine', message: "Every morning with you feels like a new beginning. ☀️" }
];

const GAMES = [
  { id: 'nicknames', title: 'What Should I Call You Today?', emoji: '💭', description: 'Spin the wheel and lock in a nickname!' }
];

function NicknameGame({ onBack }: { onBack: () => void }) {
  const [currentNicknameIndex, setCurrentNicknameIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedNickname, setSelectedNickname] = useState<typeof NICKNAMES[0] | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSpinning) {
      interval = setInterval(() => {
        setCurrentNicknameIndex((prev) => (prev + 1) % NICKNAMES.length);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isSpinning]);

  const lockIt = () => {
    setIsSpinning(false);
    setSelectedNickname(NICKNAMES[currentNicknameIndex]);
  };

  const startNew = () => {
    setSelectedNickname(null);
    setCurrentNicknameIndex(0);
    setIsSpinning(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-100 font-quicksand">
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all shadow-lg border-2 border-rose-300"
      >
        <ArrowLeft className="text-rose-900" size={24} />
      </button>

      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-rose-700 mb-2 font-fredoka">
            What Should I Call You Today? 💭
          </h1>
          <p className="text-xl text-rose-600">Spin the wheel and discover your nickname for today!</p>
        </div>

        <div className="max-w-2xl w-full">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-rose-300 p-12 mb-8">
            <div className={`text-center transition-all ${isSpinning ? 'animate-pulse' : ''}`}>
              <div className="mb-8">
                <div className="text-7xl font-bold text-rose-700 font-fredoka h-24 flex items-center justify-center">
                  {NICKNAMES[currentNicknameIndex].name}
                </div>
              </div>

              {!selectedNickname && (
                <button
                  onClick={startNew}
                  disabled={isSpinning}
                  className={`w-full py-4 px-6 rounded-full font-bold text-xl font-fredoka transition-all shadow-lg border-2 ${
                    isSpinning
                      ? 'bg-gradient-to-r from-rose-300 to-pink-300 text-white border-rose-400 animate-pulse'
                      : 'bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white border-rose-500'
                  }`}
                >
                  {isSpinning ? 'Spinning...' : 'Spin the Wheel! 🎡'}
                </button>
              )}

              {isSpinning && (
                <button
                  onClick={lockIt}
                  className="w-full py-4 px-6 rounded-full font-bold text-xl font-fredoka bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-white transition-all shadow-lg border-2 border-amber-500"
                >
                  LOCK IT IN! 💝
                </button>
              )}
            </div>

            {selectedNickname && (
              <div className="mt-12 text-center animate-fade-in">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-rose-700 font-fredoka mb-4">
                    {selectedNickname.name}
                  </div>
                  <p className="text-2xl text-rose-600 italic leading-relaxed mb-8 font-quicksand">
                    {selectedNickname.message}
                  </p>
                </div>

                <button
                  onClick={startNew}
                  className="w-full py-4 px-6 rounded-full font-bold text-xl font-fredoka bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white transition-all shadow-lg border-2 border-rose-500"
                >
                  Try Again 🎡
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NICKNAMES.map((nickname, idx) => (
              <div
                key={idx}
                className="bg-white/60 rounded-2xl p-4 border-2 border-rose-200 text-center hover:bg-white/80 transition-all"
              >
                <p className="font-bold text-rose-700 font-fredoka text-lg">{nickname.name}</p>
              </div>
            ))}
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
      `}</style>
    </div>
  );
}

function MadnessArcade({ onBack }: MadnessArcadeProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  if (selectedGame === 'nicknames') {
    return <NicknameGame onBack={() => setSelectedGame(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-100 font-quicksand">
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all shadow-lg border-2 border-rose-300"
      >
        <ArrowLeft className="text-rose-900" size={24} />
      </button>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-rose-700 mb-2 font-fredoka">
            The Madness Arcade 🎮
          </h1>
          <p className="text-xl text-rose-600">Pick a game to play together!</p>
        </div>

        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-6">
          {GAMES.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className="bg-gradient-to-r from-pink-200 to-rose-200 hover:from-pink-300 hover:to-rose-300 rounded-3xl p-8 shadow-lg border-4 border-white transition-all hover:shadow-2xl hover:scale-105 group"
            >
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:animate-bounce">{game.emoji}</div>
                <h3 className="text-3xl font-bold text-rose-900 mb-2 font-fredoka">{game.title}</h3>
                <p className="text-lg text-rose-700 font-quicksand">{game.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-rose-600 font-quicksand">More games coming soon! 💕</p>
        </div>
      </div>
    </div>
  );
}

export default MadnessArcade;
