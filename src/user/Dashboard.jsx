import InfoCard from "./components/InfoCard";
import LeaderboardCard from "./components/LeaderboardCard";
import { Trophy, TrendingUp, Medal, Flame } from 'lucide-react';

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

    return (
        <section className="py-8 px-20 max-sm:px-6 max-sm:py-4 min-h-screen">
            <h1 className="text-2xl">Dashboard</h1>
            <div className="flex justify-between gap-4 overflow-x-auto">
                {/* projects.filter(data=>(data.deadline - Date.now())>0).sort().map((data,i)=>(
                    <InfoCard title="sw24-2" deadline={data.deadline} max={data.max} now={data.now} />
                )) */}
                <InfoCard title="sw24-2" deadline={1738451042785} max={50} now={40} />
                <InfoCard title="sw24-2" deadline={1739226042785} max={50} now={39} />
                <InfoCard title="sw24-2" deadline={1744221342785} max={50} now={20} />
            </div>

            <div className="flex items-center gap-3 my-12">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h1 className="text-2xl font-bold">Топ Борлуулагчид</h1>
            </div>

            <div className="flex flex-col gap-4 w-full px-4"> {/* Removed max-w-5xl and added full width */}
                {topSellers.map((seller, index) => (
                    <div 
                        key={seller.id}
                        className={`transform transition-all duration-200 hover:scale-102
                                  ${index === 0 ? 'animate-fade-in-down' : ''}`}
                    >
                        <LeaderboardCard 
                            rank={index + 1}
                            name={seller.name}
                            score={seller.score}
                            avatar={seller.avatar}
                            trend={seller.trend}
                            streak={seller.streak}
                            stage={seller.stage}
                            progress={seller.progress}
                            stageScore={seller.stageScore}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Dashboard;
