import { TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const LeaderboardCard = ({ rank, name, score, avatar, trend, streak = 0, id }) => {

    const navigate = useNavigate()

    const getStageInfo = (score) => {
        const stages = [
            { max: 20, color: '#AAAAAA', startColor: '#3D3D3D', stage: 1 },
            { max: 40, color: '#AEB5C9', startColor: '#5B6784', stage: 2 },
            { max: 60, color: '#DAAD4D', startColor: '#9C4E00', stage: 3 },
            { max: 80, color: '#FD8601', startColor: '#A74B18', stage: 4 },
            { max: 100, color: '#BCEE34', startColor: '#4DA15D', stage: 5 },
            { max: 120, color: '#68FFBE', startColor: '#12806D', stage: 6 },
            { max: 140, color: '#00C8FF', startColor: '#0146D9', stage: 7 },
            { max: 160, color: '#DD72E7', startColor: '#622CA5', stage: 8 },
        ]

        const currentStage =
            stages.find((s) => score <= s.max) || stages[stages.length - 1]
        const prevMax = stages[currentStage.stage - 2]?.max || 0
        const stageProgress =
            ((score - prevMax) / (currentStage.max - prevMax)) * 100

        return {
            ...currentStage,
            progress: stageProgress,
            stageScore: score - prevMax,
        }
    }

    const stageInfo = getStageInfo(score)

    return (
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm 
                      transition-all duration-200 hover:bg-gray-50 hover:shadow-md 
                      dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-700/50">
            <div className="flex items-center gap-4">
                {/* Avatar circle and rank container */}
                <div className="flex items-center gap-3">
                    <div 
                        onClick={() => navigate(`/profile/${id}`)}
                        className="flex h-12 w-12 items-center justify-center 
                                overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700
                                cursor-pointer hover:ring-2 hover:ring-blue-500 
                                transition-all duration-200"
                    >
                        {avatar ? (
                            <img
                                src={avatar}
                                alt={name}
                                className="h-full w-full object-cover"
                            />
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
                <div className="flex flex-1 items-center gap-4">
                    <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                {name}
                            </h3>
                            {streak > 0 && (
                                <div className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 dark:bg-orange-900/30">
                                    <Flame className="h-4 w-4 text-orange-500" />
                                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                        {streak}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Stage {stageInfo.stage}: {stageInfo.stageScore}
                                /20
                            </span>
                            {trend === 'up' && (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            )}
                            {trend === 'down' && (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            {trend === 'same' && (
                                <Minus className="h-4 w-4 text-gray-500" />
                            )}
                        </div>
                        <div className="flex h-2.5 gap-0.5">
                            {[...Array(20)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`flex-1 rounded-sm transition-all duration-300 ${index < stageInfo.stageScore
                                        ? ''
                                        : 'bg-gray-200 dark:bg-gray-700'
                                        }`}
                                    style={
                                        index < stageInfo.stageScore
                                            ? {
                                                backgroundColor:
                                                    stageInfo.color,
                                            }
                                            : {}
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

LeaderboardCard.propTypes = {
    rank: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    trend: PropTypes.oneOf(['up', 'down', 'same']),
    streak: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default LeaderboardCard
