import PropTypes from 'prop-types'
import CircularProgressBar from "./CircularProgress"
import { useState, useEffect } from 'react'
// made by tengis

const InfoCard = ({ title = '', deadline = '', max = 0, now = 0 }) => {
    const progress = Math.round(now * 100 / max);
    const [progressColor, setProgressColor] = useState('#FF4747')
    const [timeRemaining, setTimeRemaining] = useState('')
    const [deadlineColor, setDeadlineColor] = useState('#FF4747')

    useEffect(() => {
        if (progress <= 40) {
            setProgressColor('#FF4747')
        } else if (progress < 85) {
            setProgressColor('#ED9B22')
        }
        else {
            setProgressColor('#00B448')
        }

        const calculateTimeRemaining = () => {
            const now = Date.now()
            const timeDiff = deadline - now

            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

                if (days > 0) {
                    setTimeRemaining(`${days} days ${hours} hours`)
                } else {
                    setTimeRemaining(`${hours} hours ${minutes} minutes`)
                }

                if (days <= 1) {
                    setDeadlineColor('#FF4747')
                } else if (days <= 7) {
                    setDeadlineColor('#ED9B22')
                } else {
                    setDeadlineColor('#00B448')
                }
            } else {
                setTimeRemaining('Deadline passed')
                setDeadlineColor('#FF4747') // Red if deadline has passed
            }
        }

        calculateTimeRemaining()
        const interval = setInterval(calculateTimeRemaining, 60000) // Update every minute

        return () => {
            clearInterval(interval);
        }

    }, [progress, deadline])


    return (
        <div className="pt-3 px-3 pb-1.5 dark:bg-dark-elevation rounded-lg flex gap-4 w-full min-w-[300px] m-2
        shadow-[0px_2px_5px_2px_rgba(0,52,102,0.35)] dark:shadow-[0px_2px_5px_2px_rgba(0,0,0,0.4)]">
            <CircularProgressBar progress={progress} color={progressColor} />
            <div className='flex flex-col justify-between w-full'>
                <h2 className='text-2xl uppercase'>{title}</h2>
                <p className='text-[0.7rem] text-[#003466]/50 dark:text-description capitalize'>additional information</p>
                {/* <p>Deadline: 10 Days</p> */}
                <p style={{ color: deadlineColor }} className='font-semibold'>Deadline: {timeRemaining}</p>
                <p className='text-right w-full text-[#003466]/60 dark:text-description font-semibold'>{now}/{max}</p>
            </div>
        </div>
    )
}

InfoCard.propTypes = {
    title: PropTypes.string,
    deadline: PropTypes.any,
    max: PropTypes.number,
    now: PropTypes.number
};

export default InfoCard