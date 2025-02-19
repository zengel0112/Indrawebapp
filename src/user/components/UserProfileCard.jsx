import { TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';
import PropTypes from 'prop-types';

const UserProfileCard = ({ score, trend }) => {
    const maxScore = 160;
    const progress = (score / maxScore) * 100;

    return (
        <div className="bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                        rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700
                        transition-all duration-200 hover:shadow-md">
            <div className="flex items-center gap-4">
                {/* Score and Progress */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                {score}
                            </span>
                            {trend === 'up' && <TrendingUp className="w-5 h-5 text-green-500" />}
                            {trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500" />}
                            {trend === 'same' && <Minus className="w-5 h-5 text-gray-500" />}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {score}/{maxScore} points
                        </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

UserProfileCard.propTypes = {
    score: PropTypes.number.isRequired,
    trend: PropTypes.oneOf(['up', 'down', 'same'])
};

export default UserProfileCard;