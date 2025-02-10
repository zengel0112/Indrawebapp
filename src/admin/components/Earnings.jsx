import PropTypes from 'prop-types'
import { motion } from 'motion/react'

const EarningsCard = ({ name, sales, earnings }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 dark:bg-[#293037] rounded-lg shadow-lg mb-4 flex justify-around gap-7"
        >
            <h3 className="text-lg font-semibold w-35">{name}</h3>
            <p className="text-gray-600"> {sales}</p>
            <p className="text-gray-600"> {earnings}</p>
        </motion.div>
    );
};

const Earnings = ({ timeFrame }) => {
    const earningsData = {
        'Өнөөдөр': [
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
    };
    const sortedEarnings = [...earningsData[timeFrame]].sort((a, b) => b.sales - a.sales);
    return (
        <div className="h-1/2 max-w-170 overflow-y-scroll p-4 ml-8 bg-gray-100 dark:bg-[#15191e]">
            {sortedEarnings.map((card, index) => (
                <EarningsCard
                    key={index}
                    name={card.name}
                    sales={card.sales}
                    earnings={card.earnings}
                />
            ))}
        </div>
    );
};

EarningsCard.propTypes = {
    name: PropTypes.string,
    sales: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    earnings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Earnings.propTypes = {
    timeFrame: PropTypes.number
}


export default Earnings;