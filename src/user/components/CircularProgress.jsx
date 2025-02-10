import PropTypes from 'prop-types'
// made by tengis
const CircularProgressBar = ({ progress, color = '#ED9B22' }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background  */}
                <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                />
                {/* main circle */}
                <circle
                    style={{ stroke: color }}
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className='-rotate-90 origin-center'
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from={circumference}
                        to={offset}
                        dur="700ms"
                        fill="freeze"
                        calcMode="spline"
                        keySplines="0.25 0.1 0.25 1"
                    />
                </circle>
            </svg>
            {/* text */}
            <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold"
                style={{ color: color }}>
                {progress}%
            </div>
        </div>
    );
};

CircularProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
    color: PropTypes.string
}

export default CircularProgressBar;