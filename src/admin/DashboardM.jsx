import { useState, useRef, useEffect } from 'react'
import Card from './components/Card'
import Earnings from './components/Earnings'
import LeaderboardCard from '../user/components/LeaderboardCard'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { ChevronDown } from 'lucide-react'

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]
const values = [30, 45, 60, 35, 25, 40, 69, 85, 45, 50, 30, 55]
const seasons = ['Өвөл', 'Хавар', 'Зун', 'Намар']
const seasonValues = [40, 55, 30, 69]
const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
const weekValues = [25, 40, 60, 45]

const DashboardM = () => {
    const [firstTimeframe, setFirstTimeframe] = useState('Улирал')
    const [secondTimeframe, setSecondTimeframe] = useState('Өнөөдөр')
    const pieChartRef = useRef(null)
    const lineChartRef = useRef(null)

    const handleFirstTimeframeChange = () => {
        setFirstTimeframe((prev) =>
            prev === 'Улирал' ? 'Сар' : prev === 'Сар' ? '7 хоног' : 'Улирал'
        )
    }

    const handleSecondTimeframeChange = (event) => {
        setSecondTimeframe(event.target.value)
    }

    const data = [
        { title: 'Өнөөдөр', value: '13', percentage: 40 },
        { title: 'Энэ 7 хоног', value: '6', percentage: 60 },
        { title: 'Энэ сар', value: '13', percentage: 90 },
    ]

    let chartData
    if (firstTimeframe === 'Улирал') {
        chartData = { labels: seasons, values: seasonValues }
    } else if (firstTimeframe === 'Сар') {
        chartData = { labels: months, values: values }
    } else {
        chartData = { labels: weeks, values: weekValues }
    }

    useEffect(() => {
        const pieChart = new Chart(pieChartRef.current, {
            type: 'pie',
            plugins: [ChartDataLabels],
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: 'Ангилал хуваарилалт',
                        data: chartData.values,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                        ],
                        borderColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#000000',
                        },
                    },
                    datalabels: {
                        color: '#ffffff',
                        formatter: (value, context) => {
                            const total =
                                context.chart.data.datasets[0].data.reduce(
                                    (a, b) => a + b,
                                    0
                                )
                            return ((value / total) * 100).toFixed(2) + '%'
                        },
                    },
                },
            },
        })

        const lineChart = new Chart(lineChartRef.current, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: 'Performance',
                        data: chartData.values,
                        fill: false,
                        borderColor: '#FF5733',
                        tension: 0.2,
                        borderWidth: 3,
                        pointBackgroundColor: '#FF5733',
                        pointBorderColor: '#FFF',
                        pointBorderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#000000',
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#000000',
                        },
                    },
                    y: {
                        ticks: {
                            color: '#000000',
                        },
                    },
                },
            },
        })

        return () => {
            lineChart.destroy()
            pieChart.destroy()
        }
    }, [chartData, firstTimeframe])

    const date = new Date()
    const options = {
        month: 'short',
        year: 'numeric',
        weekday: 'long',
        day: 'numeric',
    }
    const formattedDate = date.toLocaleDateString('en-US', options)

    return (
        <section className="bg-[#ffffff] max-sm:px-2 max-sm:py-1 dark:bg-[#15191e]">
            <div className="flex items-center justify-between sm:px-10 sm:py-2">
                <h1 className="px-7 py-3 text-2xl font-bold text-nowrap max-md:text-xl">
                    Менежерийн самбар
                </h1>
                <p className="pr-4 text-nowrap text-gray-500 sm:text-[13px]">
                    {formattedDate}
                </p>
            </div>
            <div className="bg-[#f7f9fd] p-4 max-sm:p-2 dark:bg-[#101214]">
                <div className="flex gap-7 overflow-x-auto">
                    <div className="flex w-[350px] flex-col gap-2 pl-10">
                        {data.map((item, index) => (
                            <Card
                                key={index}
                                title={item.title}
                                value={item.value}
                                percentage={item.percentage}
                            />
                        ))}
                    </div>
                    <div className="mt-2 h-[463px] w-[470px] rounded-lg bg-[#ffffff] shadow-[0px_2px_5px_2px_rgba(0,52,102,0.35)] dark:bg-[#293037]">
                        <h3 className="px-8 pt-3 text-lg font-semibold">
                            Дугуй диаграмм
                        </h3>
                        <canvas
                            ref={pieChartRef}
                            className="object-contain pt-7 pr-9 pb-13 pl-9"
                        ></canvas>
                    </div>
                    <div className="mt-2 ml-6 h-[463px] rounded-lg bg-[#ffffff] shadow-[0px_2px_5px_2px_rgba(0,52,102,0.35)] dark:bg-[#293037] dark:text-white">
                        <h3 className="flex justify-between px-8 pt-3 text-lg font-semibold">
                            Шугаман диаграмм
                            <span>
                                <button
                                    className="flex items-center gap-2 rounded-lg bg-[#023468] px-4 py-2 text-white shadow hover:bg-blue-600 dark:bg-[#3c65d5]"
                                    onClick={handleFirstTimeframeChange}
                                >
                                    {firstTimeframe}
                                    <ChevronDown className="h-3 w-3" />
                                </button>
                            </span>
                        </h3>
                        <canvas
                            ref={lineChartRef}
                            className="mt-8 flex h-80 items-center justify-center"
                        ></canvas>
                    </div>
                </div>
                <div className="">
                    <div className="= mt-5 grid grid-cols-[43%_52%] gap-12 p-4 text-[#4d5461] max-[968px]:grid-cols-1 dark:text-white">
                        <div className="">
                            <div className="flex items-center gap-4 px-8">
                                <h2 className="text-xl font-bold">
                                    Борлуулагчид
                                </h2>
                                <select
                                    id="timeframe"
                                    value={secondTimeframe}
                                    onChange={handleSecondTimeframeChange}
                                    className="rounded border-none p-1 font-bold text-gray-500"
                                >
                                    <option value="Өнөөдөр">Өнөөдөр</option>
                                    <option value="Энэ 7 хоног">
                                        Энэ 7 хоног
                                    </option>
                                    <option value="Энэ сар">Энэ сар</option>
                                    <option value="Энэ жил">Энэ жил</option>
                                </select>
                            </div>
                            <Earnings
                                className="p"
                                timeFrame={secondTimeframe}
                            />
                        </div>
                        <div className="flex flex-col gap-5">
                            <h2 className="text-xl font-bold text-nowrap">
                                Топ Борлуулагчид
                            </h2>
                            <LeaderboardCard
                                gold
                                sliderValue={179}
                                name={'Mnkula'}
                            />
                            <LeaderboardCard
                                sliderValue={158}
                                name={'Unnamed'}
                            />
                            <LeaderboardCard
                                sliderValue={127}
                                name={'Medyum'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashboardM
