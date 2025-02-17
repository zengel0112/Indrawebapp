import InfoCard from "./components/InfoCard";
import LeaderboardCard from "./components/LeaderboardCard";
import { Trophy, TrendingUp, Flame } from 'lucide-react';

const Dashboard = () => {
    const getStageInfo = (score) => {
        const stages = [
            { max: 20, stage: 1 },
            { max: 40, stage: 2 },
            { max: 60, stage: 3 },
            { max: 80, stage: 4 },
            { max: 100, stage: 5 },
            { max: 120, stage: 6 },
            { max: 140, stage: 7 },
            { max: 160, stage: 8 }
        ];

        const currentStage = stages.find(s => score <= s.max) || stages[stages.length - 1];
        const prevMax = stages[currentStage.stage - 2]?.max || 0;
        const progress = ((score - prevMax) / (currentStage.max - prevMax)) * 100;

        return {
            stage: currentStage.stage,
            progress: progress,
            stageScore: score - prevMax
        };
    };

    const getStageColor = (stage) => {
        const colors = [
            { color: '#AAAAAA', bgLight: 'bg-[#AAAAAA]', bgDark: 'dark:bg-[#AAAAAA]', emptyLight: 'bg-[#AAAAAA]/20', emptyDark: 'dark:bg-[#AAAAAA]/20' },
            { color: '#AEB5C9', bgLight: 'bg-[#AEB5C9]', bgDark: 'dark:bg-[#AEB5C9]', emptyLight: 'bg-[#AEB5C9]/20', emptyDark: 'dark:bg-[#AEB5C9]/20' },
            { color: '#DAAD4D', bgLight: 'bg-[#DAAD4D]', bgDark: 'dark:bg-[#DAAD4D]', emptyLight: 'bg-[#DAAD4D]/20', emptyDark: 'dark:bg-[#DAAD4D]/20' },
            { color: '#FD8601', bgLight: 'bg-[#FD8601]', bgDark: 'dark:bg-[#FD8601]', emptyLight: 'bg-[#FD8601]/20', emptyDark: 'dark:bg-[#FD8601]/20' },
            { color: '#BCEE34', bgLight: 'bg-[#BCEE34]', bgDark: 'dark:bg-[#BCEE34]', emptyLight: 'bg-[#BCEE34]/20', emptyDark: 'dark:bg-[#BCEE34]/20' },
            { color: '#68FFBE', bgLight: 'bg-[#68FFBE]', bgDark: 'dark:bg-[#68FFBE]', emptyLight: 'bg-[#68FFBE]/20', emptyDark: 'dark:bg-[#68FFBE]/20' },
            { color: '#00C8FF', bgLight: 'bg-[#00C8FF]', bgDark: 'dark:bg-[#00C8FF]', emptyLight: 'bg-[#00C8FF]/20', emptyDark: 'dark:bg-[#00C8FF]/20' },
            { color: '#DD72E7', bgLight: 'bg-[#DD72E7]', bgDark: 'dark:bg-[#DD72E7]', emptyLight: 'bg-[#DD72E7]/20', emptyDark: 'dark:bg-[#DD72E7]/20' }
        ];
        return colors[stage - 1] || colors[0];
    };

    const topSellers = [
        { id: 1, name: 'Mnkula', score: 139, avatar: null, trend: 'up', streak: 5 },
        { id: 2, name: 'Unnamed', score: 158, avatar: null, trend: 'up', streak: 3 },
        { id: 3, name: 'Medyum', score: 127, avatar: null, trend: 'down', streak: 2 },
        { id: 4, name: 'Hotshot', score: 96, avatar: null, trend: 'up', streak: 1 },
        { id: 5, name: 'Valvidek', score: 75, avatar: null, trend: 'same', streak: 0 },
        { id: 6, name: 'Odd', score: 54, avatar: null, trend: 'down', streak: 0 },
        { id: 7, name: 'Enzi', score: 33, avatar: null, trend: 'up', streak: 0 },
        { id: 8, name: 'Nigge', score: 12, avatar: null, trend: 'down', streak: 0 }
    ].map(seller => ({
        ...seller,
        ...getStageInfo(seller.score)
    })).sort((a, b) => {
        if (b.stage !== a.stage) return b.stage - a.stage;
        return b.progress - a.progress;
    });

    const rainbowBorderStyles = `
        @keyframes rainbow-border {
            0% { border-color: #ff0000; }
            17% { border-color: #ff8000; }
            33% { border-color: #ffff00; }
            50% { border-color: #00ff00; }
            67% { border-color: #00ffff; }
            83% { border-color: #0000ff; }
            100% { border-color: #ff0000; }
        }

        .rainbow-border {
            animation: rainbow-border 4s linear infinite;
            border-width: 3px;
            border-style: solid;
        }

        .rainbow-border:hover {
            animation-duration: 2s;
        }
    `;

    const gradientStyles = `
  @keyframes gradient {
    0% { --gradient-angle: 0deg; }
    100% { --gradient-angle: 360deg; }
  }

  @property --gradient-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  .gradient-container {
    position: relative;
    border-radius: 1rem;
    padding: 3px;
    background-clip: content-box, border-box;
    background-origin: border-box;
    transition: all 0.3s ease;
  }

  .gradient-border-gold {
    background: 
      var(--bg-color),
      linear-gradient(var(--gradient-angle), #FFD700, #FFA500, #FF8C00, #FFD700);
    animation: gradient 3s linear infinite;
  }

  .gradient-border-silver {
    background: 
      var(--bg-color),
      linear-gradient(var(--gradient-angle), #C0C0C0, #808080, #A9A9A9, #C0C0C0);
    animation: gradient 3s linear infinite;
  }

  .gradient-border-bronze {
    background: 
      var(--bg-color),
      linear-gradient(var(--gradient-angle), #CD7F32, #B8860B, #DAA520, #CD7F32);
    animation: gradient 3s linear infinite;
  }

  .gradient-container:hover {
    transform: translateY(-2px);
  }

  .gradient-content {
    background: var(--bg-color);
    border-radius: 0.75rem;
    height: 100%;
  }
`;

    return (
        <section className="py-8 px-20 max-sm:px-6 max-sm:py-4 min-h-screen">
            {/* Info Cards Section */}
            <div className="flex justify-between gap-4 overflow-x-auto">
                <InfoCard title="sw24-2" deadline={1738451042785} max={50} now={40} />
                <InfoCard title="sw24-2" deadline={1739226042785} max={50} now={39} />
                <InfoCard title="sw24-2" deadline={1744221342785} max={50} now={20} />
            </div>

            <div className="flex items-center gap-3 my-12">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h1 className="text-2xl font-bold">Топ Борлуулагчид</h1>
            </div>

            {/* Top 3 Players Section */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {/* Second Place */}
                <div className="order-1 mt-8">
                    {topSellers[1] && (
                        <>
                            <style>
                                {`
                                    @keyframes silver-border {
                                        0% { border-color: #C0C0C0; }
                                        33% { border-color: #00ffff; }
                                        66% { border-color: #000fff; }
                                        100% { border-color: #A9A9A9; }
                                    }
                                    .silver-border {
                                        animation: silver-border 4s linear infinite;
                                    }
                                `}
                            </style>
                            <style>
                                {`
                                    @keyframes silver-border {
                                        0% { border-color: #C0C0C0; }
                                        33% { border-color: #00ffff; }
                                        66% { border-color: #000fff; }
                                        100% { border-color: #A9A9A9; }
                                    }
                                    .silver-border {
                                        animation: silver-border 6s ease-in-out infinite;
                                        border-width: 3px;
                                    }
                                `}
                            </style>
                            <div className="p-6 bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/80 
                                          rounded-xl text-center border-2 silver-border
                                          transition-all duration-200 hover:shadow-lg relative group">
                                <div className="absolute -left-3 top-4 w-10 h-10 bg-gray-200 dark:bg-gray-700/80 
                                              flex items-center justify-center rounded-lg shadow-md">
                                    <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">2</span>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                        {topSellers[1].avatar ? (
                                            <img src={topSellers[1].avatar} alt={topSellers[1].name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-2xl font-bold text-gray-400 dark:text-gray-300">{topSellers[1].name[0]}</span>
                                        )}
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{topSellers[1].name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-3">Score: {topSellers[1].score}</p>
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    {topSellers[1].streak > 0 && (
                                        <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">
                                            <Flame className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{topSellers[1].streak}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-0.5 h-2.5 mb-1">
                                    {[...Array(20)].map((_, index) => (
                                        <div
                                            key={index}
                                            className={`flex-1 rounded-sm transition-all duration-300 
                                                      ${index < topSellers[1].stageScore
                                                        ? getStageColor(topSellers[1].stage).bgLight + ' ' + getStageColor(topSellers[1].stage).bgDark
                                                        : getStageColor(topSellers[1].stage).emptyLight + ' ' + getStageColor(topSellers[1].stage).emptyDark}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Stage {topSellers[1].stage}</span>
                            </div>
                        </>
                    )}
                </div>

                {/* First Place */}
                <div className="order-2">
                    {topSellers[0] && (
                        <>
                            <style>
                                {`
                                    @keyframes rainbow-border {
                                        0% { border-color: #ff0000; }
                                        14% { border-color: #ff8800; }
                                        28% { border-color: #ffff00; }
                                        42% { border-color: #00ff00; }
                                        56% { border-color: #00ffff; }
                                        70% { border-color: #0088ff; }
                                        84% { border-color: #8800ff; }
                                        100% { border-color: #ff0000; }
                                    }
                                    .rainbow-border {
                                        animation: rainbow-border 8s ease-in-out infinite;
                                        border-width: 4px;
                                    }
                                `}
                            </style>
                            <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100/50 dark:hover:bg-yellow-900/30 
                                          rounded-xl text-center border-2 rainbow-border
                                          transition-all duration-200 hover:shadow-xl relative group">
                                <div className="absolute -left-3 top-4 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/80 
                                              flex items-center justify-center rounded-lg shadow-md">
                                    <span className="text-3xl font-bold text-yellow-500 dark:text-yellow-400">1</span>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center overflow-hidden">
                                        {topSellers[0].avatar ? (
                                            <img src={topSellers[0].avatar} alt={topSellers[0].name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-3xl font-bold text-yellow-500">{topSellers[0].name[0]}</span>
                                        )}
                                    </div>
                                </div>
                                <h3 className="font-bold text-xl">{topSellers[0].name}</h3>
                                <p className="text-gray-600 mb-3">Score: {topSellers[0].score}</p>
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    {topSellers[0].streak > 0 && (
                                        <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">
                                            <Flame className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{topSellers[0].streak}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-0.5 h-2.5 mb-1">
                                    {[...Array(20)].map((_, index) => (
                                        <div
                                            key={index}
                                            className={`flex-1 rounded-sm transition-all duration-300 
                                                      ${index < topSellers[0].stageScore
                                                        ? getStageColor(topSellers[0].stage).bgLight + ' ' + getStageColor(topSellers[0].stage).bgDark
                                                        : getStageColor(topSellers[0].stage).emptyLight + ' ' + getStageColor(topSellers[0].stage).emptyDark}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-yellow-600">Stage {topSellers[0].stage}</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Third Place */}
                <div className="order-3 mt-8">
                    {topSellers[2] && (
                        <>
                            <style>
                                {`
                                    @keyframes bronze-border {
                                        0% { border-color: #CD7F32; }
                                        33% { border-color: #fff000; }
                                        66% { border-color: #ff0000; }
                                        100% { border-color: #CD7F32; }
                                    }
                                    .bronze-border {
                                        animation: bronze-border 4s linear infinite;
                                    }
                                `}
                            </style>
                            <style>
                                {`
                                    @keyframes bronze-border {
                                        0% { border-color: #CD7F32; }
                                        33% { border-color: #fff000; }
                                        66% { border-color: #ff0000; }
                                        100% { border-color: #CD7F32; }
                                    }
                                    .bronze-border {
                                        animation: bronze-border 6s ease-in-out infinite;
                                        border-width: 3px;
                                    }
                                `}
                            </style>
                            <div className="p-6 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100/50 dark:hover:bg-orange-900/30 
                                          rounded-xl text-center border-2 bronze-border
                                          transition-all duration-200 hover:shadow-lg relative group">
                                <div className="absolute -left-3 top-4 w-10 h-10 bg-orange-100 dark:bg-orange-900/80 
                                              flex items-center justify-center rounded-lg shadow-md">
                                    <span className="text-2xl font-bold text-orange-500 dark:text-orange-400">3</span>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
                                        {topSellers[2].avatar ? (
                                            <img src={topSellers[2].avatar} alt={topSellers[2].name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-2xl font-bold text-orange-500">{topSellers[2].name[0]}</span>
                                        )}
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">{topSellers[2].name}</h3>
                                <p className="text-gray-600 mb-3">Score: {topSellers[2].score}</p>
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    {topSellers[2].streak > 0 && (
                                        <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">
                                            <Flame className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{topSellers[2].streak}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-0.5 h-2.5 mb-1">
                                    {[...Array(20)].map((_, index) => (
                                        <div
                                            key={index}
                                            className={`flex-1 rounded-sm transition-all duration-300 
                                                      ${index < topSellers[2].stageScore
                                                        ? getStageColor(topSellers[2].stage).bgLight + ' ' + getStageColor(topSellers[2].stage).bgDark
                                                        : getStageColor(topSellers[2].stage).emptyLight + ' ' + getStageColor(topSellers[2].stage).emptyDark}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-orange-600">Stage {topSellers[2].stage}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Rest of the Leaderboard */}
            <div className="flex flex-col gap-4 w-full">
                {topSellers.slice(3).map((seller, index) => (
                    <LeaderboardCard 
                        key={seller.id}
                        rank={index + 4}
                        name={seller.name}
                        score={seller.score}
                        avatar={seller.avatar}
                        trend={seller.trend}
                        streak={seller.streak}
                        stage={seller.stage}
                        progress={seller.progress}
                        stageScore={seller.stageScore}
                    />
                ))}
            </div>
        </section>
    );
};

export default Dashboard;
