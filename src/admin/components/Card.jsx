import PropTypes from 'prop-types'
const getColor = (percentage) => {
    if (percentage >= 1 && percentage <= 40) {
        return 'bg-red-500 text-red-500'
    } else if (percentage >= 41 && percentage <= 69) {
        return 'bg-yellow-400 text-yellow-400'
    } else if (percentage >= 70 && percentage <= 100) {
        return 'bg-green-500 text-green-500'
    }
    return 'bg-gray-200 text-gray-200'
}
const getArrowIcon = (percentage) => {
    if (percentage >= 1 && percentage <= 40) {
        return <i className="fi fi-sr-arrow-down text-white"></i>
    } else if (percentage >= 41 && percentage <= 69) {
        return <i className="fi fi-sr-arrow-right text-white"></i>
    } else if (percentage >= 70 && percentage <= 100) {
        return <i className="fi fi-sr-arrow-up text-white"></i>
    }
    return null
}

const Card = ({ title, value, percentage }) => {
    const colorClass = getColor(percentage)

    return (
        <div className="dark:shadow-[0px_2px_5px_2px rgba(0,0,0,0.4)] m-2 flex w-70 flex-col rounded-lg bg-white shadow-[0px_2px_5px_2px_rgba(0,52,102,0.35)] dark:bg-[#293037]">
            <h2 className="mt-2 px-6 text-lg font-semibold">{title}</h2>
            <div className="flex justify-around pr-3 pb-6">
                <p className="flex w-[40px] items-center gap-18 px-10 text-4xl font-semibold">
                    {value}
                </p>
                <span
                    className={`flex h-[70px] w-[70px] items-center justify-center rounded text-4xl ${colorClass.split(' ')[0]}`}
                >
                    {getArrowIcon(percentage)}
                </span>
            </div>

            <div className="relative bottom-5 h-2 w-full rounded">
                <p
                    className={`absolute left-0 translate-x-1/2 font-semibold ${colorClass.split(' ')[1]}`}
                >
                    {percentage}%
                </p>
                <div
                    className={`mt-5.5 h-full rounded ${colorClass.split(' ')[0]}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string,
    value: PropTypes.any,
    percentage: PropTypes.number,
}

export default Card
