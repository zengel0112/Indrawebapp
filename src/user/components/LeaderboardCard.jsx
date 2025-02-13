import { TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';
import PropTypes from 'prop-types';

const LeaderboardCard = ({ rank, name, score, avatar, trend, streak = 0 }) => {
    const getStageInfo = (score) => {
        const stages = [
            { max: 20, color: '#AAAAAA', startColor: '#3D3D3D', stage: 1 },
            { max: 40, color: '#AEB5C9', startColor: '#5B6784', stage: 2 },
            { max: 60, color: '#DAAD4D', startColor: '#9C4E00', stage: 3 },
            { max: 80, color: '#FD8601', startColor: '#A74B18', stage: 4 },
            { max: 100, color: '#BCEE34', startColor: '#4DA15D', stage: 5 },
            { max: 120, color: '#68FFBE', startColor: '#12806D', stage: 6 },
            { max: 140, color: '#00C8FF', startColor: '#0146D9', stage: 7 },
            { max: 160, color: '#DD72E7', startColor: '#622CA5', stage: 8 }
        ];

        const currentStage = stages.find(s => score <= s.max) || stages[stages.length - 1];
        const prevMax = stages[currentStage.stage - 2]?.max || 0;
        const stageProgress = ((score - prevMax) / (currentStage.max - prevMax)) * 100;

        return {
            ...currentStage,
            progress: stageProgress,
            stageScore: score - prevMax
        };
    };

    const stageInfo = getStageInfo(score);

    return (
        <div className="bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                        rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700
                        transition-all duration-200 hover:shadow-md">
            <div className="flex items-center gap-4">
                {/* Avatar circle and rank container */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full 
                                  bg-gray-100 dark:bg-gray-700 overflow-hidden">
                        {avatar ? (
                            <img src={avatar} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xl font-bold text-gray-400 dark:text-gray-300">
                                {name[0]}
                            </span>
                        )}
                    </div>
                    <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                        {rank}
                    </span>
                </div>

                {/* Rest of the content */}
                <div className="flex-1 flex items-center gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                {name}
                            </h3>
                            {streak > 0 && (
                                <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">
                                    <Flame className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{streak}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Stage {stageInfo.stage}: {stageInfo.stageScore}/20
                            </span>
                            {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                            {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                            {trend === 'same' && <Minus className="w-4 h-4 text-gray-500" />}
                        </div>
                        <div className="flex gap-0.5 h-2.5">
                            {[...Array(20)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`flex-1 rounded-sm transition-all duration-300 
                                              ${index < stageInfo.stageScore
                                                ? ''
                                                : 'bg-gray-200 dark:bg-gray-700'}`}
                                    style={index < stageInfo.stageScore ? {
                                        backgroundColor: stageInfo.color
                                    } : {}}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LeaderboardCard.propTypes = {
    rank: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    trend: PropTypes.oneOf(['up', 'down', 'same']),
    streak: PropTypes.number
};

export default LeaderboardCard;