import { TrendingUp, TrendingDown, Minus, Medal, Flame } from 'lucide-react';
import PropTypes from 'prop-types';

const LeaderboardCard = ({ rank, name, score, avatar, trend, isGold, isSilver, isBronze, streak = 0 }) => {
    const getBgColor = () => {
        if (isGold) return 'bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 dark:from-yellow-500/20 dark:to-yellow-500/10';
        if (isSilver) return 'bg-gradient-to-r from-gray-300/10 to-gray-300/5 dark:from-gray-300/20 dark:to-gray-300/10';
        if (isBronze) return 'bg-gradient-to-r from-orange-500/10 to-orange-500/5 dark:from-orange-500/20 dark:to-orange-500/10';
        return 'bg-white dark:bg-gray-800/50';
    };

    const getMedalColor = () => {
        if (isGold) return 'text-yellow-500';
        if (isSilver) return 'text-gray-400';
        if (isBronze) return 'text-orange-500';
        return 'text-gray-400';
    };

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
        <div className={`${getBgColor()} rounded-xl p-4 shadow-sm 
                        border border-gray-100 dark:border-gray-700
                        hover:shadow-md transition-all duration-200`}>
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full 
                              bg-gray-100 dark:bg-gray-700">
                    {avatar ? (
                        <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
                    ) : (
                        <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                            {rank}
                        </span>
                    )}
                </div>

                <div className="flex-1 flex items-center gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                {name}
                            </h3>
                            {(isGold || isSilver || isBronze) && (
                                <Medal className={`w-5 h-5 ${getMedalColor()}`} />
                            )}
                            {streak > 0 && (
                                <div className="flex items-center gap-1 bg-orange-100 px-2 py-0.5 rounded-full">
                                    <Flame className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm font-medium text-orange-600">{streak}</span>
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
    isGold: PropTypes.bool,
    isSilver: PropTypes.bool,
    isBronze: PropTypes.bool,
    streak: PropTypes.number
};

export default LeaderboardCard;