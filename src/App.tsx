import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Search, 
  Mic, 
  ChevronLeft, 
  Circle, 
  RotateCcw,
  Maximize2,
  Gamepad2,
  Lock,
  Power,
  X,
  RefreshCw,
  Globe,
  Brain,
  PlayCircle,
  Trophy,
  Ghost,
  Grid3X3,
  Target,
  ShoppingBag,
  Flashlight
} from 'lucide-react';
import { APPS, AppConfig } from './constants';
import { cn } from './lib/utils';

// --- Constants ---
const UNLOCK_CODE = "999000";

// --- Components ---

const AppLock = ({ app, onUnlock, onCancel }: { app: AppConfig; onUnlock: () => void; onCancel: () => void }) => {
  const [input, setInput] = useState("");
  
  const handleKey = (key: string) => {
    if (input.length < 6) {
      const next = input + key;
      setInput(next);
      if (next === UNLOCK_CODE) {
        setTimeout(onUnlock, 300);
      } else if (next.length === 6) {
        setTimeout(() => setInput(""), 500);
      }
    }
  };

  return (
    <div className="absolute inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center p-8 text-white">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn("w-24 h-24 rounded-[32px] mb-8 flex items-center justify-center shadow-2xl", app.color)}
      >
        <app.icon size={48} className="text-white" />
      </motion.div>
      <h3 className="text-2xl font-black mb-2 tracking-tight uppercase">{app.name} QULFLANGAN</h3>
      <p className="text-white/40 text-[10px] mb-12 tracking-[0.2em] uppercase font-bold">Xavfsizlik kodi: 999000</p>
      
      <div className="flex gap-4 mb-20">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className={cn(
              "w-4 h-4 rounded-full border-2 border-white/10 transition-all duration-300",
              input.length > i ? "bg-white border-white scale-110 shadow-[0_0_20px_white]" : ""
            )}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-x-8 gap-y-6 w-full max-w-[280px]">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((key, i) => (
          <button 
            key={i}
            onClick={() => key === "⌫" ? setInput(s => s.slice(0, -1)) : key && handleKey(key)}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all",
              key ? "bg-white/5 active:bg-white/20 active:scale-90" : "pointer-events-none"
            )}
          >
            {key}
          </button>
        ))}
      </div>
      
      <button 
        onClick={onCancel}
        className="mt-16 text-white/30 hover:text-white transition-colors text-xs font-black tracking-widest uppercase"
      >
        BEKOR QILISH
      </button>
    </div>
  );
};

const StatusBar = ({ dark }: { dark?: boolean }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn(
      "h-10 px-6 flex items-center justify-between text-xs font-semibold select-none z-[60]",
      dark ? "text-white" : "text-[#4a523a]"
    )}>
      <div className="flex items-center gap-1">
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px]">5G</span>
        <Signal size={12} strokeWidth={3} />
        <Wifi size={12} strokeWidth={3} />
        <div className="flex items-center gap-1">
          <span>100%</span>
          <Battery size={14} strokeWidth={3} className="rotate-90" />
        </div>
      </div>
    </div>
  );
};

const NavigationBar = ({ onHome, onBack, onRecents, dark }: { onHome: () => void, onBack: () => void, onRecents: () => void, dark?: boolean }) => (
  <div className="h-12 flex items-center justify-around px-8 bg-transparent z-[60]">
    <button onClick={onBack} className={cn("p-2 transition-colors", dark ? "text-white/50 hover:text-white" : "text-[#4a523a]/50 hover:text-[#4a523a]")}>
      <ChevronLeft size={20} />
    </button>
    <button onClick={onHome} className={cn("p-2 transition-colors", dark ? "text-white/50 hover:text-white" : "text-[#4a523a]/50 hover:text-[#4a523a]")}>
      <Circle size={16} fill="currentColor" />
    </button>
    <button onClick={onRecents} className={cn("p-2 transition-colors", dark ? "text-white/50 hover:text-white" : "text-[#4a523a]/50 hover:text-[#4a523a]")}>
      <RotateCcw size={18} className="-scale-x-100" />
    </button>
  </div>
);

const AppIcon = ({ app, onClick, lightText }: { app: AppConfig; onClick: (app: AppConfig) => void, lightText?: boolean }) => {
  const Icon = app.icon;
  const isGame = app.category === 'game';
  
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => onClick(app)}
      className="flex flex-col items-center gap-1 w-full group relative"
    >
      <div className={cn(
        "w-[50px] h-[50px] rounded-[18px] flex items-center justify-center shadow-lg transition-all border border-white/10",
        app.color,
        "group-hover:scale-105 active:scale-95"
      )}>
        <Icon size={24} className={cn(app.color === 'bg-white' ? 'text-[#8a9a5b]' : 'text-white')} />
      </div>
      {isGame && (
        <span className="absolute top-[-2px] right-[-2px] bg-red-600 text-white text-[6px] px-1 rounded-full font-bold shadow-sm ring-1 ring-white/20 uppercase">
          LIVE
        </span>
      )}
      <span className={cn(
        "text-[9px] font-medium text-center truncate w-full px-1",
        lightText ? "text-white/80" : "text-white"
      )}>
        {app.name}
      </span>
    </motion.button>
  );
};

// --- Games ---

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: any[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? `G'olib: ${winner}` : board.every(s => s) ? "Durang!" : `Navbat: ${isXNext ? 'X' : 'O'}`;

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="text-xl font-bold text-white mb-2">{status}</div>
      <div className="grid grid-cols-3 gap-2 bg-white/10 p-2 rounded-2xl backdrop-blur-sm">
        {board.map((val, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-2xl font-bold text-white hover:bg-white/20 transition-colors"
          >
            {val}
          </button>
        ))}
      </div>
      <button 
        onClick={() => {setBoard(Array(9).fill(null)); setIsXNext(true);}}
        className="flex items-center gap-2 bg-[#8a9a5b] text-white px-6 py-2 rounded-full font-bold shadow-lg mt-4 active:scale-95 transition-transform"
      >
        <RefreshCw size={16} /> Yangilash
      </button>
    </div>
  );
};

// --- Mini Apps ---

const BrowserApp = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [history, setHistory] = useState(['https://www.google.com']);
  
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-3 bg-gray-100 flex items-center gap-2 border-b">
        <div className="flex-1 flex items-center bg-white rounded-full px-4 py-1.5 border gap-2">
          <Globe size={14} className="text-gray-400" />
          <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 text-sm outline-none text-gray-700" 
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Globe size={32} className="text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Internet Browser</h3>
        <p className="text-gray-500 text-sm">Simulating browsing for: <br/><span className="text-blue-500 font-mono">{url}</span></p>
        <div className="w-full h-48 bg-gray-50 rounded-xl border border-dashed flex items-center justify-center">
          <span className="text-gray-400 text-xs">Web Content Simulation</span>
        </div>
      </div>
    </div>
  );
};

const ChatGPTApp = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Salom! Men ChatGPTman. Sizga qanday yordam bera olaman?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Simple mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Samsung S26 Ultra juda zo'r telefon! Sizning savolingiz: "${input}" haqida ko'proq ma'lumot bera olaman.` 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f4f4]">
      <div className="p-4 bg-white border-b flex items-center justify-center gap-2">
        <Brain size={20} className="text-[#10a37f]" />
        <span className="font-bold text-gray-800">ChatGPT</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "max-w-[80%] p-3 rounded-2xl text-sm",
            m.role === 'user' ? "bg-[#10a37f] text-white self-end ml-auto" : "bg-white text-gray-800 shadow-sm"
          )}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="p-4 bg-white flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Xabar yozing..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none text-sm"
        />
        <button onClick={handleSend} className="bg-[#10a37f] text-white p-2 rounded-full">
          <ChevronLeft size={20} className="rotate-180" />
        </button>
      </div>
    </div>
  );
};

const YouTubeApp = () => {
  const videos = [
    { title: 'Real Madrid 2014 La Decima Highlights', views: '1.2B views', time: '10:45', thumb: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400' },
    { title: 'Samsung S26 Ultra Official Trailer', views: '800M views', time: '03:12', thumb: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=400' },
    { title: 'Best goals of Cristiano Ronaldo', views: '4.5B views', time: '15:20', thumb: 'https://images.unsplash.com/photo-1518091043644-c1d445bcc97a?q=80&w=400' },
    { title: 'Real Madrid vs Atletico Madrid 4-1 Final', views: '2.1B views', time: '20:15', thumb: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400' }
  ];
  
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-white flex items-center gap-2 border-b sticky top-0 z-10">
        <PlayCircle size={24} className="text-red-600" />
        <span className="font-bold text-lg tracking-tight">YouTube</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-20">
        {videos.map((v, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-video bg-gray-200 rounded-xl relative overflow-hidden group">
              <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <PlayCircle size={48} className="text-white/80 group-hover:scale-110 transition-transform" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1 rounded">{v.time}</div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">RM</div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold leading-snug line-clamp-2 text-gray-800">{v.title}</h4>
                <p className="text-[10px] text-gray-500">Real Madrid TV • {v.views} • 2 years ago</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlayStoreApp = () => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [installed, setInstalled] = useState<string[]>([]);

  const games = APPS.filter(app => app.category === 'game');

  const handleInstall = (id: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      setInstalled(prev => [...prev, id]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-white border-b sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 via-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
            <ShoppingBag size={18} className="text-white" />
          </div>
          <span className="font-bold text-gray-800">Play Market</span>
        </div>
        <Search size={20} className="text-gray-400" />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar pb-24">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 px-1">Top O'yinlar (2026)</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {games.slice(0, 10).map(game => (
              <div key={game.id} className="flex-shrink-0 w-32 space-y-2">
                <div className={cn("w-32 h-32 rounded-3xl flex items-center justify-center shadow-md", game.color)}>
                  <game.icon size={48} className="text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 truncate">{game.name}</h4>
                  <p className="text-[10px] text-gray-500 truncate">4.9 • 850MB</p>
                </div>
                <button 
                  onClick={() => handleInstall(game.id)}
                  disabled={downloading === game.id || installed.includes(game.id)}
                  className={cn(
                    "w-full py-1.5 rounded-full text-xs font-bold transition-all relative overflow-hidden",
                    installed.includes(game.id) 
                      ? "bg-gray-100 text-green-600" 
                      : (downloading === game.id ? "bg-blue-50 text-blue-400" : "bg-blue-600 text-white active:scale-95")
                  )}
                >
                  {downloading === game.id && (
                    <motion.div 
                      initial={{ left: '-100%' }}
                      animate={{ left: '0%' }}
                      transition={{ duration: 2 }}
                      className="absolute inset-0 bg-blue-500/20"
                    />
                  )}
                  <span className="relative z-10">
                    {installed.includes(game.id) ? "Tayyor" : (downloading === game.id ? "Yuklanmoqda" : "O'rnatish")}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 px-1">Tavsiya etiladi</h3>
          <div className="space-y-4">
            {games.slice(10, 20).map(game => (
              <div key={game.id + 'rec'} className="flex items-center gap-4">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm", game.color)}>
                   <game.icon size={24} className="text-white" />
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="font-bold text-gray-800">{game.name}</span>
                  <span className="text-xs text-gray-500">Real Madrid Choice • 4.8</span>
                </div>
                <button 
                  onClick={() => handleInstall(game.id + 'rec')}
                  className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-bold hover:bg-blue-100"
                >
                  O'rnatish
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GameApp = ({ app }: { app: AppConfig }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<'playing' | 'scored' | 'missed' | 'racing'>('playing');
  const [score, setScore] = useState(0);

  const isFootball = app.id.startsWith('game-fb');
  const isRacing = app.id.startsWith('game-rc');
  const isCoinGame = app.id === 'game-coins';

  if (isPlaying) {
    if (isCoinGame) {
      return (
        <div className="flex flex-col h-full bg-blue-500 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-white/10 grid grid-cols-4 gap-1 opacity-20">
            {[...Array(20)].map((_, i) => <div key={i} className="border border-white/10" />)}
          </div>
          <div className="z-10 flex-1 flex flex-col items-center justify-between p-8">
            <div className="text-3xl font-black italic mt-4">TANGA TERISH</div>
            <div className="text-4xl font-black flex items-center gap-2">
              <Coins className="text-yellow-400" size={32} /> {score}
            </div>
            
            <div className="relative w-full h-48 bg-white/5 rounded-3xl overflow-hidden border border-white/10">
               {/* Character */}
               <motion.div 
                 animate={{ x: score % 200, y: Math.sin(score) * 20 }}
                 className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-xl"
               >
                 <User size={24} className="text-blue-500" />
               </motion.div>
               {/* Tanga */}
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ repeat: Infinity }}
                 className="absolute top-1/2 right-12 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_20px_#fbbf24]"
               >
                 <span className="text-sm font-bold text-yellow-900">$</span>
               </motion.div>
            </div>

            <button 
              onMouseDown={() => setScore(s => s + 1)}
              className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform mb-8"
            >
              <Zap size={40} className="text-yellow-900" />
            </button>
          </div>
          <button onClick={() => setIsPlaying(false)} className="absolute top-4 right-4 bg-black/40 p-2 rounded-full z-50">
            <X size={16} />
          </button>
        </div>
      );
    }

    if (isFootball) {
      return (
        <div className="flex flex-col h-full bg-green-600 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000')] bg-cover opacity-30" />
          <div className="z-10 flex-1 flex flex-col items-center justify-center p-8">
            <h3 className="text-3xl font-black italic mb-4">PENALTY SHOOTOUT</h3>
            <div className="text-xl font-bold mb-8">GOALS: {score}</div>
            
            {/* Goal Post */}
            <div className="w-full h-48 border-4 border-white/50 border-b-0 relative rounded-t-lg">
              <motion.div 
                animate={{ x: [0, 60, -60, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-20 bg-black/40 rounded-t-full border-2 border-white/20 flex items-center justify-center"
              >
                <div className="w-4 h-4 rounded-full bg-orange-400" />
              </motion.div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-6">
              <motion.div 
                whileTap={{ scale: 1.2, y: -200 }}
                onClick={() => {
                  if (Math.random() > 0.3) {
                    setScore(s => s + 1);
                    setStatus('scored');
                  } else {
                    setStatus('missed');
                  }
                  setTimeout(() => setStatus('playing'), 1500);
                }}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
              >
                <div className="w-full h-full rounded-full border-4 border-black/10 flex items-center justify-center">
                   <div className="w-6 h-6 bg-black rounded-full" />
                </div>
              </motion.div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">Tepish uchun to-pni bosing</p>
            </div>

            <AnimatePresence>
              {status !== 'playing' && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  className={cn(
                    "absolute top-1/3 text-6xl font-black italic drop-shadow-2xl",
                    status === 'scored' ? "text-yellow-400" : "text-red-500"
                  )}
                >
                  {status === 'scored' ? "GOL!!!" : "XATO!"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={() => setIsPlaying(false)} className="absolute top-4 right-4 bg-black/40 p-2 rounded-full z-50">
            <X size={16} />
          </button>
        </div>
      );
    }

    if (isRacing) {
      return (
        <div className="flex flex-col h-full bg-gray-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000')] bg-cover opacity-20" />
          <div className="z-10 flex-1 flex flex-col items-center justify-center">
             <div className="text-6xl font-black mb-4 italic text-yellow-400">SPEED</div>
             <div className="text-2xl mb-8">Score: {score}</div>
             <motion.div 
               animate={{ x: [0, 5, -5, 0], y: [0, -2, 2, 0] }}
               transition={{ repeat: Infinity, duration: 0.2 }}
               className="w-24 h-48 bg-red-600 rounded-xl relative border-4 border-black"
             >
               <div className="absolute top-2 left-2 w-4 h-8 bg-blue-400 rounded-sm" />
               <div className="absolute top-2 right-2 w-4 h-8 bg-blue-400 rounded-sm" />
               <div className="absolute bottom-4 left-[-8px] w-4 h-12 bg-black rounded-sm" />
               <div className="absolute bottom-4 right-[-8px] w-4 h-12 bg-black rounded-sm" />
             </motion.div>
          </div>
          <div className="p-8 flex justify-around z-20">
            <button 
              onMouseDown={() => setScore(s => s + 10)}
              className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center active:scale-95 transition-transform"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onMouseDown={() => setScore(s => s + 20)}
              className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center font-black active:scale-95 transition-transform shadow-xl shadow-green-600/50"
            >
              GAS
            </button>
            <button 
              onMouseDown={() => setScore(s => s + 10)}
              className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center active:scale-95 transition-transform"
            >
              <ChevronLeft size={32} className="rotate-180" />
            </button>
          </div>
          <button onClick={() => setIsPlaying(false)} className="absolute top-4 right-4 bg-white/10 p-2 rounded-full z-50">
            <X size={16} />
          </button>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#111] text-white">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn("w-32 h-32 rounded-[40px] flex items-center justify-center shadow-2xl mb-8", app.color)}
        >
          <app.icon size={64} className="text-white" />
        </motion.div>
        <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">{app.name}</h2>
        <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden mb-8">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isPlaying ? '100%' : '30%' }}
            transition={{ duration: 1 }}
            className="h-full bg-white"
          />
        </div>
        <p className="text-white/40 text-sm mb-12 uppercase tracking-widest italic animate-pulse">HALA MADRID! YUKLANMOQDA... {app.name}</p>
        <button 
          onClick={() => setIsPlaying(true)}
          className="bg-white text-black px-12 py-4 rounded-full font-black text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 transition-transform uppercase tracking-widest"
        >
          O'YINNI BOSHLASH
        </button>
      </div>
      <div className="p-8 text-center text-[10px] text-white/40 uppercase tracking-[0.5em] font-bold">
        RM LEGACY STUDIO 2026
      </div>
    </div>
  );
};

const FlashlightApp = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className={cn("flex-1 flex flex-col items-center justify-center gap-8 transition-colors duration-500", isOn ? "bg-white" : "bg-black")}>
      <motion.button 
        animate={{ scale: isOn ? 1.1 : 1 }}
        onClick={() => setIsOn(!isOn)}
        className={cn(
          "w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all",
          isOn ? "bg-gray-100 text-yellow-500 ring-8 ring-yellow-400/20" : "bg-gray-900 text-gray-700"
        )}
      >
        <Flashlight size={48} />
      </motion.button>
      <span className={cn("font-bold uppercase tracking-widest text-sm", isOn ? "text-gray-400" : "text-gray-600")}>
        {isOn ? "YONDI" : "O'CHIK"}
      </span>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState("");
  const [isPoweredOff, setIsPoweredOff] = useState(false);
  const [openApp, setOpenApp] = useState<AppConfig | null>(null);
  const [isAppVerified, setIsAppVerified] = useState(false);
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenApp = (app: AppConfig) => {
    setOpenApp(app);
    setIsAppVerified(false);
  };

  const systemApps = APPS.filter(app => app.isSystem);
  const otherApps = APPS.filter(app => !app.isSystem);

  const handleHome = () => {
    setOpenApp(null);
    setIsAppDrawerOpen(false);
    setSearchQuery('');
  };

  const handleBack = () => {
    if (openApp) setOpenApp(null);
    else if (isAppDrawerOpen) {
      setIsAppDrawerOpen(false);
      setSearchQuery('');
    }
  };

  const handlePinInput = (digit: string) => {
    const newPin = pin + digit;
    setPin(newPin);
    if (newPin === UNLOCK_CODE) {
      setTimeout(() => {
        setIsLocked(false);
        setPin('');
      }, 300);
    } else if (newPin.length >= UNLOCK_CODE.length) {
      setTimeout(() => setPin(''), 500);
    }
  };

  if (isPoweredOff) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="relative w-[380px] h-[720px] bg-black rounded-[48px] border-[4px] border-slate-900 overflow-hidden flex flex-col items-center justify-center">
          <div className="text-white/20 flex flex-col items-center gap-4">
            <Power size={48} className="animate-pulse" />
            <span className="text-xs tracking-widest font-light">SAMSUNG S26 ULTRA</span>
          </div>
          <button 
            onClick={() => {
              setIsPoweredOff(false);
              setIsLocked(true);
            }}
            className="absolute bottom-16 px-12 py-4 bg-white text-black rounded-full font-bold active:scale-95 transition-transform"
          >
            YONISH
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e5e7eb] flex items-center justify-center p-4 font-sans overflow-hidden">
      {/* Samsung S26 Ultra Physical Frame */}
      <div className="relative w-[380px] h-[720px] bg-[#1a1a1a] rounded-[48px] border-[4px] border-[#333] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col p-[10px]">
        {/* Physical Buttons Side */}
        <div className="absolute right-[-4px] top-40 w-[4px] h-16 bg-[#333] rounded-l-md" />
        
        {/* Screen Content */}
        <div 
          className="relative flex-1 flex flex-col bg-[#001e4e] rounded-[38px] overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1614632537190-23e414dca735?q=80&w=1000')` }}
        >
          {/* Real Madrid Center Logo Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-10 pointer-events-none">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png" 
              className="w-full h-full object-contain"
              alt="RM Logo"
            />
          </div>
          {/* Overlay to ensure readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          <StatusBar dark={isLocked} />

          <main className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {isLocked ? (
                <motion.div 
                  key="lockscreen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-[100] bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-8 text-white"
                >
                  <div className="mb-12 text-center select-none">
                    <h2 className="text-6xl font-light mb-2">
                       {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </h2>
                    <p className="text-sm opacity-60">Yakshanba, 25-Aprel</p>
                  </div>
                  <Lock size={32} className="mb-6 text-white/80" />
                  <div className="text-xl font-light mb-8">Kodni kiriting</div>
                  <div className="flex gap-2 mb-8 flex-wrap justify-center max-w-[200px]">
                    {UNLOCK_CODE.split('').map((_, i) => (
                      <div key={i} className={cn(
                        "w-2 h-2 rounded-full border border-white/30",
                        pin.length > i ? "bg-white" : "bg-transparent"
                      )} />
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {['1','2','3','4','5','6','7','8','9','0'].map(digit => (
                      <button 
                        key={digit}
                        onClick={() => handlePinInput(digit)}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center font-medium"
                      >
                        {digit}
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 text-[8px] text-white/30 text-center tracking-tighter">
                    Real Madrid SIM • Pin: 999000
                  </div>
                  <button 
                    onClick={() => setIsPoweredOff(true)}
                    className="absolute bottom-12 p-3 text-red-500/50 hover:text-red-500 transition-colors flex flex-col items-center gap-1"
                  >
                    <Power size={20} />
                    <span className="text-[8px] uppercase tracking-widest">O'chirish</span>
                  </button>
                </motion.div>
              ) : !openApp ? (
                <motion.div 
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col"
                >
                  {/* Digital Clock Widget */}
                  <div className="pt-8 px-8 mb-4 text-center select-none drop-shadow-lg">
                    <h1 className="text-[64px] font-extralight tracking-tight text-white">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </h1>
                    <p className="text-sm font-medium mt-1 text-white/80 uppercase tracking-wider">
                      HALA MADRID • 2014 LEGACY
                    </p>
                  </div>

                  {/* App Shortcut Grid (Home Screen) */}
                  <div className="flex-1 px-4 overflow-y-auto no-scrollbar">
                    <div className="grid grid-cols-4 gap-y-6 gap-x-2 py-8">
                       {[
                         'game-fb-1', 'game-fb-2', 'game-coins', 'game-rc-1',
                         'youtube', 'chatgpt', 'facebook', 'instagram',
                         'telegram', 'spotify', 'tiktok', 'camera',
                         'settings', 'gallery', 'calendar', 'calculator',
                         'notes', 'clock', 'weather', 'contacts'
                       ].map(id => {
                         const app = APPS.find(a => a.id === id);
                         return app ? <AppIcon key={app.id} app={app} onClick={handleOpenApp} /> : null;
                       })}
                    </div>
                  </div>

                  {/* Power Button in Home */}
                  <div className="absolute top-8 right-8 flex gap-2 bg-black/20 backdrop-blur-md rounded-full p-1">
                    <button 
                      onClick={() => setIsLocked(true)}
                      className="p-2 text-white/50 hover:text-white transition-colors"
                      title="Qulflash"
                    >
                      <Lock size={16} />
                    </button>
                    <button 
                      onClick={() => setIsPoweredOff(true)}
                      className="p-2 text-red-500/50 hover:text-red-500 transition-colors"
                      title="O'chirish"
                    >
                      <Power size={16} />
                    </button>
                  </div>

                  {/* Dock Area */}
                  <div className="px-4 py-6 relative">
                    <div className="bg-white/20 backdrop-blur-2xl rounded-[24px] p-4 flex justify-around items-end shadow-xl border border-white/10">
                      {['phone', 'messages', 'browser', 'store'].map(id => {
                        const app = APPS.find(a => a.id === id);
                        return app ? (
                          <div key={app.id} className="w-12 h-12 flex items-center justify-center">
                             <AppIcon app={app} onClick={handleOpenApp} />
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
            {openApp && !isAppVerified && (
              <AppLock 
                app={openApp} 
                onUnlock={() => setIsAppVerified(true)} 
                onCancel={() => setOpenApp(null)} 
              />
            )}
            
            {openApp && isAppVerified && (
              <motion.div 
                key={openApp.id}
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute inset-0 z-50 bg-[#f5f5f0] flex flex-col"
              >
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="bg-white flex-1 overflow-hidden flex flex-col">
                    <StatusBar dark={false} />
                    <div className="flex-1 overflow-hidden">
                      {openApp.id === 'youtube' ? <YouTubeApp /> :
                       openApp.id === 'chatgpt' ? <ChatGPTApp /> :
                       openApp.id === 'browser' ? <BrowserApp /> :
                       openApp.id === 'store' ? <PlayStoreApp /> :
                       openApp.id === 'torch' ? <FlashlightApp /> :
                       openApp.id === 'game-tictactoe' ? <div className="p-4 bg-[#1a1a1a] h-full"><TicTacToe /></div> :
                       openApp.category === 'game' ? <GameApp app={openApp} /> :
                       (
                        <div className="flex flex-col items-center justify-center h-full bg-white p-8 text-center text-gray-400">
                          <motion.div 
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className={cn("w-20 h-20 rounded-[28px] mb-6 flex items-center justify-center shadow-xl", openApp.color)}
                          >
                             <openApp.icon size={40} className="text-white" />
                          </motion.div>
                          <h3 className="text-xl font-bold text-gray-800">{openApp.name}</h3>
                          <p className="text-xs uppercase tracking-[0.3em] font-bold mt-2 text-blue-600/50">Ilova ishga tushdi</p>
                          <div className="mt-8 px-6 py-2 bg-gray-50 rounded-full text-[10px] font-black text-gray-400 border border-gray-100">
                            999000 BILAN TASDIQLANGAN
                          </div>
                        </div>
                       )}
                    </div>
                    <NavigationBar dark onHome={handleHome} onBack={handleBack} onRecents={() => {}} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

          {/* App Drawer Trigger */}
          {!openApp && !isLocked && (
            <button 
              onClick={() => setIsAppDrawerOpen(true)}
              className="absolute left-1/2 -translate-x-1/2 bottom-20 w-8 h-12 flex flex-col items-center gap-1 group z-40"
            >
              <div className="w-10 h-[4px] rounded-full bg-white/40 group-hover:bg-white/60 transition-colors shadow-lg" />
            </button>
          )}

          {/* App Drawer Overlay */}
          <AnimatePresence>
            {isAppDrawerOpen && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute inset-0 z-[200] bg-black/60 backdrop-blur-3xl flex flex-col p-4 pt-12"
              >
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search 90 apps..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 text-white rounded-full py-3 pl-12 pr-12 focus:outline-none focus:ring-2 ring-white/20 transition-all font-medium text-sm"
                  />
                  <Mic className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 cursor-pointer" size={18} />
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar">
                  <div className="grid grid-cols-4 gap-y-8 gap-x-2 pb-24 p-2">
                    {filteredApps.map(app => (
                      <AppIcon key={app.id} app={app} onClick={(app) => {
                        handleOpenApp(app);
                        setIsAppDrawerOpen(false);
                      }} lightText />
                    ))}
                  </div>
                </div>

                {/* Close Drawer Button */}
                <button 
                  onClick={() => setIsAppDrawerOpen(false)}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 p-4 group"
                >
                  <div className="w-16 h-1.5 bg-white/20 group-hover:bg-white/40 rounded-full transition-colors shadow-lg" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!isLocked && (
            <NavigationBar 
              onHome={handleHome} 
              onBack={handleBack} 
              onRecents={() => {}} 
              dark={true} 
            />
          )}
        </div>

        {/* Camera Hole Punch */}
        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full pointer-events-none z-[100] shadow-inner" />
      </div>

      {/* Decorative Branding */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-[#8a9a5b] font-bold tracking-[0.4em] text-[10px] uppercase pointer-events-none select-none">
        SAMSUNG S26 ULTRA • MADRIDISTA EDITION
      </div>
    </div>
  );
}
