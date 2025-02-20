import PropTypes from 'prop-types'
import { motion } from 'motion/react'

const EarningsCard = ({ name, sales, earnings }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex w-[600px] justify-around gap-7 rounded-lg bg-white p-4 shadow-lg dark:bg-[#293037]"
        >
            <h3 className="w-35 text-lg font-semibold">{name}</h3>
            <p className="text-gray-600 dark:text-gray-300"> {sales}</p>
            <p className="text-nowrap text-gray-600 dark:text-gray-300">
                {' '}
                {earnings}
            </p>
        </motion.div>
    )
}

const Earnings = ({ timeFrame }) => {
    console.log('Current timeFrame:', timeFrame)
    const earningsData = {
        Өнөөдөр: [
            { name: 'Gegeehenn', sales: '50', earnings: '1,000,000 ₮' },
            { name: 'Your_Galaa', sales: '70', earnings: '1,500,000 ₮' },
            { name: 'Valvidek', sales: '52', earnings: '1,000,000 ₮' },
            { name: 'Suld_kenz', sales: '55', earnings: '1,500,000 ₮' },
            { name: 'Bazo_inurhead', sales: '60', earnings: '2,000,000 ₮' },
            { name: 'Saya_Uvuu', sales: '61', earnings: '2,500,000 ₮' },
            { name: 'ZugeerItgel', sales: '70', earnings: '3,000,000 ₮' },
            { name: 'EmptyBulgaa', sales: '75', earnings: '3,500,000 ₮' },
        ],
        'Энэ 7 хоног': [
            { name: 'Bazo_inurhead', sales: '200', earnings: '2,000,000 ₮' },
            { name: 'Saya_Uvuu', sales: '250', earnings: '2,500,000 ₮' },
            { name: 'Bazo_inurhead', sales: '200', earnings: '2,000,000 ₮' },
            { name: 'Saya_Uvuu', sales: '250', earnings: '2,500,000 ₮' },
        ],
        'Энэ сар': [
            { name: 'ZugeerItgel', sales: '300', earnings: '3,000,000 ₮' },
            { name: 'EmptyBulgaa', sales: '350', earnings: '3,500,000 ₮' },
            { name: 'ZugeerItgel', sales: '300', earnings: '3,000,000 ₮' },
            { name: 'EmptyBulgaa', sales: '350', earnings: '3,500,000 ₮' },
        ],
        'Энэ жил': [
            { name: 'ZugeerItgel', sales: '300', earnings: '3,000,000 ₮' },
            { name: 'EmptyBulgaa', sales: '350', earnings: '3,500,000 ₮' },
            { name: 'ZugeerItgel', sales: '300', earnings: '3,000,000 ₮' },
            { name: 'EmptyBulgaa', sales: '350', earnings: '3,500,000 ₮' },
        ],
    }
    const sortedEarnings = [...earningsData[timeFrame]].sort(
        (a, b) => b.sales - a.sales
    )
    return (
        <div className="md:ml-none mt-4 ml-4 h-[550px] overflow-x-scroll bg-gray-100 p-4 dark:bg-[#15191e] dark:text-white">
            <div className="ml-15 flex pb-2">
                <p className="w-60">Нэр</p>
                <p className="w-40">Элсэлт</p>
                <p>Тооцоо</p>
            </div>
            {sortedEarnings.map((card, index) => (
                <EarningsCard
                    key={index}
                    name={card.name}
                    sales={card.sales}
                    earnings={card.earnings}
                />
            ))}
        </div>
    )
}

EarningsCard.propTypes = {
    name: PropTypes.string,
    sales: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    earnings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Earnings.propTypes = {
    timeFrame: PropTypes.string.isRequired,
}

export default Earnings
