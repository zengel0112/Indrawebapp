import { useState } from 'react'
import Card from './components/Card'
import Earnings from './components/Earnings'

const DashboardM = () => {
    const date = new Date();
    const options = {
        month: 'short',
        year: 'numeric',
        weekday: 'long',
        day: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const data = [
        { title: 'Өнөөдөр', value: '27 3333 ₮', percentage: 40 },
        { title: 'Энэ 7 хоног', value: '27 3333 ₮', percentage: 60 },
        { title: 'Энэ сар', value: '27 3333 ₮', percentage: 90 },
    ];

    const [timeFrame, setTimeFrame] = useState('Өнөөдөр');

    const handleTimeFrameChange = (event) => {
        setTimeFrame(event.target.value);
    };

    return (
        <section className="max-sm:px-6 max-sm:py-4">
            <div className="flex justify-between items-center px-16 py-6">
                <h1 className="text-2xl font-bold">Менежерийн самбар</h1>
                <p className="text-gray-500">{formattedDate}</p>
            </div>
            <div className="h-screen bg-[#f7f9fd] dark:bg-[#101214] p-4">
                <div className="flex justify-around gap-10 overflow-x-auto px-10 py-4">
                    {data.map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            value={item.value}
                            percentage={item.percentage}
                        />
                    ))}
                </div>
                <div className="flex gap-6 items-center px-13 py-6">
                    <h2 className="text-xl font-bold">Борлуулагчид</h2>
                    <select
                        id="timeframe"
                        value={timeFrame}
                        onChange={handleTimeFrameChange}
                        className="ml-2 border border-gray-300 rounded p-1"
                    >
                        <option value="Өнөөдөр">Өнөөдөр</option>
                        <option value="Энэ 7 хоног">Энэ 7 хоног</option>
                        <option value="Энэ сар">Энэ сар</option>
                        <option value="Энэ жил">Энэ жил</option>
                    </select>
                </div>
                <div className='flex gap-43 ml-30'>
                    <p className='w-18'>Нэр</p>
                    <p className='w-1'>Элсэлт</p>
                    <p>Тооцоо</p>
                </div>
                <Earnings timeFrame={timeFrame} />
            </div>
        </section>
    );
};

export default DashboardM;