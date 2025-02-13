import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Edit2, Camera, Save, X, Sun, Moon, Trophy, TrendingUp, CheckCircle, Flame, Mail, Phone, MapPin, Globe, Briefcase, User, Calendar, FileText } from 'lucide-react';  //npm install lucide-react
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Add this style at the top of your component after imports
const flameStyles = `
  @keyframes flameAnimation {
    0% { 
      transform: scale(1) rotate(-2deg);
      filter: brightness(1);
    }
    25% {
      transform: scale(1.1) rotate(2deg);
      filter: brightness(1.2);
    }
    50% { 
      transform: scale(1.15) rotate(-1deg);
      filter: brightness(1.3);
    }
    75% {
      transform: scale(1.1) rotate(1deg);
      filter: brightness(1.2);
    }
    100% { 
      transform: scale(1) rotate(-2deg);
      filter: brightness(1);
    }
  }

  .flame-animate {
    animation: flameAnimation 2s ease-in-out infinite;
    transform-origin: center bottom;
  }

  .flame-low {
    animation-duration: 2.5s;
    filter: brightness(0.9) saturate(0.8);
  }

  .flame-medium {
    animation-duration: 2s;
    filter: brightness(1.1) saturate(1.2);
  }

  .flame-high {
    animation-duration: 1.5s;
    filter: brightness(1.3) saturate(1.4);
  }
`;

// Helper function for random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Get initials from name
const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const values = [30, 45, 60, 35, 25, 40, 69, 85, 45, 50, 30, 55];

const seasons = ['Өвөл', 'Хавар', 'Зун', 'Намар'];
const seasonValues = [40, 55, 30, 69];

const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
const weekValues = [25, 40, 60, 45];

const TimeframeSelector = ({ selected, onChange }) => {
  const timeframes = [
    { id: 'annual', label: 'Жилийн' },
    { id: 'season', label: 'Улирлын' },
    { id: 'week', label: 'Долоо хоног' }
  ];

  return (
    <div className="flex gap-2 mb-4">
      {timeframes.map((tf) => (
        <button
          key={tf.id}
          onClick={() => onChange(tf.id)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selected === tf.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {tf.label}
        </button>
      ))}
    </div>
  );
};

const UserProfile = ({ isDarkMode, toggleDarkMode }) => {
  const [timeframe, setTimeframe] = useState("annual");
  const [profileData, setProfileData] = useState(() => {
    const savedData = localStorage.getItem('profileData');
    return savedData ? JSON.parse(savedData) : {
      name: "User",
      role: "Front-End Developer",
      avatar: null,
      email: "",
      location: "",
      website: "",
      bio: ""
    };
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const fileInputRef = useRef(null);
  const [randomColor] = useState(getRandomColor());
  const [stats, setStats] = useState({
    tasksCompleted: 3,
    totalTasks: 4,
    currentStreak: 3,
    rank: 4,
    score: 96
  });

  const getChartData = () => {
    switch(timeframe) {
      case 'annual':
        return { labels: months, values: values };
      case 'season':
        return { labels: seasons, values: seasonValues };
      case 'week':
        return { labels: weeks, values: weekValues };
      default:
        return { labels: months, values: values };
    }
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfileData = {
          ...profileData,
          avatar: reader.result
        };
        setProfileData(newProfileData);
        localStorage.setItem('profileData', JSON.stringify(newProfileData));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle edit mode
  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
  };

  // Handle save changes
  const handleSave = () => {
    setProfileData(tempData);
    localStorage.setItem("profileData", JSON.stringify(tempData));
    setIsEditing(false);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const chartData = getChartData();
    const lineChart = new Chart(lineChartRef.current, {
      type: 'line',
      data: {
      labels: chartData.labels,
      datasets: [{
        label: 'Гүйцэтгэл',
        data: chartData.values,
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)', 
        borderColor: '#3B82F6',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
      },
      options: {
      responsive: true,
      plugins: {
        legend: {
        display: false
        },
        tooltip: {
        backgroundColor: '#1F2937',
        padding: 12,
        titleColor: '#fff', 
        bodyColor: '#fff',
        borderColor: '#3B82F6',
        borderWidth: 1
        }
      },
      scales: {
        y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        }
        },
        x: {
        grid: {
          display: false
        }
        }
      }
      }
    });

    const pieChart = new Chart(pieChartRef.current, {
      type: 'pie',
      plugins: [ChartDataLabels],
      data: {
      labels: chartData.labels,
      datasets: [{
        label: 'Ангилал хуваарилалт',
        data: chartData.values,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        borderWidth: 1,
      }],
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
              const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(2) + '%';
              return percentage;
            },
          },
        },
      },
    });

    return () => {
      lineChart.destroy();
      pieChart.destroy();
    };
  }, [timeframe]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-[1920px] mx-auto p-8"> {/* Increased max width */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8"> {/* Changed to 5 columns */}
          {/* Profile Section - Left Side */}
          <div className="md:col-span-2"> {/* Takes 2 columns now */}
            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl 
                         shadow-xl p-8 border border-gray-200/50 dark:border-gray-700/50
                         transition-all duration-200 hover:shadow-2xl">
              <div className="flex flex-col items-center max-w-2xl mx-auto"> {/* Added max width */}
                {/* Avatar Section - made larger */}
                <div className="relative mb-8 group">
                  {profileData.avatar ? (
                    <img 
                      src={profileData.avatar} 
                      alt="Profile" 
                      className="w-56 h-56 rounded-full object-cover ring-4 ring-blue-500/30
                               transition-all duration-200 group-hover:ring-blue-500/50"
                    />
                  ) : (
                    <div 
                      className="w-56 h-56 rounded-full flex items-center justify-center 
                               text-white text-6xl font-bold ring-4 ring-blue-500/30
                               transition-all duration-200 group-hover:ring-blue-500/50"
                      style={{ backgroundColor: randomColor }}
                    >
                      {getInitials(profileData.name)}
                    </div>
                  )}
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-3 right-3 bg-blue-500 p-4 rounded-full text-white
                             shadow-lg hover:bg-blue-600 hover:scale-110 transition-all duration-200
                             opacity-0 group-hover:opacity-100"
                  >
                    <Camera size={24} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                <div className="text-center space-y-4 w-full">
                  {isEditing ? (
                    <div className="text-center space-y-4 w-full">
                      <div className="grid grid-cols-1 gap-4">
                        {/* Basic Info */}
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 
                                     border border-gray-200 dark:border-gray-600 rounded-xl
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Name"
                          />
                        </div>

                        <div className="relative group">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={profileData.role}
                            onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 
                                     border border-gray-200 dark:border-gray-600 rounded-xl
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Role/Position"
                          />
                        </div>

                        {/* Contact Info */}
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 
                                     border border-gray-200 dark:border-gray-600 rounded-xl
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Email Address"
                          />
                        </div>

                        <div className="relative group">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 
                                     border border-gray-200 dark:border-gray-600 rounded-xl
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Phone Number"
                          />
                        </div>

                        {/* Location & Links */}
                        <div className="relative group">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 
                                     border border-gray-200 dark:border-gray-600 rounded-xl
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Location"
                          />
                        </div>

                        <div className="relative group">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="url"
                            value={profileData.website}
                            onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 
                                     border border-gray-200 dark:border-gray-600 rounded-xl
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Website"
                          />
                        </div>

                        {/* Bio */}
                        <div className="relative group">
                          <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 
                                     border border-gray-200 dark:border-gray-600 rounded-xl
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Write something about yourself..."
                            rows="4"
                          />
                        </div>
                      </div>

                      {/* Save/Cancel Buttons */}
                      <div className="flex gap-2 mt-6">
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            localStorage.setItem('profileData', JSON.stringify(profileData));
                          }}
                          className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl
                                   hover:bg-blue-600 transition-all duration-200 font-medium"
                        >
                          <Save size={18} className="inline mr-2" /> Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setProfileData(JSON.parse(localStorage.getItem('profileData')));
                          }}
                          className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-xl
                                   hover:bg-gray-600 transition-all duration-200 font-medium"
                        >
                          <X size={18} className="inline mr-2" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.name}</h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300">{profileData.role}</p>
                      
                      {profileData.email && (
                        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                          <Mail className="w-4 h-4" />
                          <span>{profileData.email}</span>
                        </div>
                      )}
                      
                      {profileData.location && (
                        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                          <MapPin className="w-4 h-4" />
                          <span>{profileData.location}</span>
                        </div>
                      )}
                      
                      {profileData.website && (
                        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                          <Globe className="w-4 h-4" />
                          <a href={profileData.website} className="hover:text-blue-500">{profileData.website}</a>
                        </div>
                      )}
                      
                      {profileData.bio && (
                        <div className="text-gray-600 dark:text-gray-300 mt-4">
                          <p>{profileData.bio}</p>
                        </div>
                      )}

                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full px-6 py-3 mt-4 bg-blue-500 text-white rounded-xl
                                 hover:bg-blue-600 transition-all duration-200 font-medium"
                      >
                        <Edit2 size={18} className="inline mr-2" /> 
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-4
                          border border-gray-200/50 dark:border-gray-700/50 
                          transition-all duration-200 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Ранк</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">#{stats.rank}</div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-4
                          border border-gray-200/50 dark:border-gray-700/50 
                          transition-all duration-200 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Нийт борлуулалт</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.score}</div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-4
                          border border-gray-200/50 dark:border-gray-700/50 
                          transition-all duration-200 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Даалгаварын явц</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.tasksCompleted} / {stats.totalTasks}
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(stats.tasksCompleted / stats.totalTasks) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-4
                          border border-gray-200/50 dark:border-gray-700/50 
                          transition-all duration-200 hover:shadow-lg group">
                <style>{flameStyles}</style>
                <div className="flex items-center gap-3 mb-2">
                    <Flame className="w-5 h-5 text-orange-400 dark:text-orange-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Week streaks</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.currentStreak}</span>
                    <div className="relative">
                        <Flame 
                            className={`w-6 h-6 text-orange-500 flame-animate
                          ${stats.currentStreak < 3 ? 'flame-low' : 
                            stats.currentStreak < 7 ? 'flame-medium' : 'flame-high'}`}
                            fill="currentColor"
                            strokeWidth={1.5}
                        />
                        {stats.currentStreak >= 7 && (
                            <Flame 
                                className="w-6 h-6 absolute inset-0 text-yellow-400 opacity-50 flame-animate"
                                style={{ animationDelay: '-0.5s' }}
                                fill="currentColor"
                                strokeWidth={1}
                            />
                        )}
                    </div>
                </div>
              </div>
            </div>

            {/* Charts Section - Right Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Шугаман диаграм</h3>
                <TimeframeSelector selected={timeframe} onChange={setTimeframe} />
                <canvas ref={lineChartRef} className="h-64"></canvas>
              </div>

              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Дугуй диаграм</h3>
                <canvas ref={pieChartRef} className="h-64"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;