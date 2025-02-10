import PropTypes from 'prop-types'
import { useRef } from 'react'
// made by tengis
// got lazy sorry

const Slider = ({ value = 107 }) => {

    const sliderThumbRef = useRef(null);

    const getBackgroundColor = (value) => {
        if (value <= 20) {
            return '#AAAAAA'
        } else if (value <= 40) {
            return '#AEB5C9'
        } else if (value <= 60) {
            return '#DAAD4D'
        } else if (value <= 80) {
            return '#DAAD4D'
        } else if (value <= 100) {
            return '#BCEE34'
        } else if (value <= 120) {
            return '#68FFBE'
        } else if (value <= 140) {
            return '#00C8FF'
        } else if (value <= 160) {
            return '#DD72E7'
        }
    }

    const getSliderStyle = (value) => {
        if (value <= 20) {
            return `linear-gradient(to right, #3D3D3D 0%, #AAAAAA ${value / 20 * 100}%, #fff ${value / 20 * 100}%)`
        } else if (value <= 40) {
            return `linear-gradient(to right, #5B6784 0%, #AEB5C9 ${(value - 20) / 20 * 100}%, #fff ${(value - 20) / 20 * 100}%)`
        } else if (value <= 60) {
            return `linear-gradient(to right, #9C4E00 0%, #DAAD4D ${(value - 40) / 20 * 100}%, #fff ${(value - 40) / 20 * 100}%)`
        } else if (value <= 80) {
            return `linear-gradient(to right, #A74B18 0%, #FD8601 ${(value - 60) / 20 * 100}%, #fff ${(value - 60) / 20 * 100}%)`
        } else if (value <= 100) {
            return `linear-gradient(to right, #4DA15D 0%, #BCEE34 ${(value - 80) / 20 * 100}%, #fff ${(value - 80) / 20 * 100}%)`
        } else if (value <= 120) {
            return `linear-gradient(to right, #12806D 0%, #68FFBE ${(value - 100) / 20 * 100}%, #fff ${(value - 100) / 20 * 100}%)`
        } else if (value <= 140) {
            return `linear-gradient(to right, #0146D9 0%, #00C8FF ${(value - 120) / 20 * 100}%, #fff ${(value - 120) / 20 * 100}%)`
        } else if (value <= 160) {
            return `linear-gradient(to right, #622CA5 0%, #DD72E7 ${(value - 140) / 20 * 100}%, #fff ${(value - 140) / 20 * 100}%)`
        } else if (value <= 180) {
            return `linear-gradient(to right, #F9132A 0%, #394AB7 ${(value - 160) / 20 * 100}%, #fff ${(value - 160) / 20 * 100}%)`
        }
        else return `linear-gradient(to right, #38FF84 0%, #8C57CE ${(value - 180) / 20 * 100}%, #fff ${(value - 180) / 20 * 100}%)`
    }

    const backgroundColor = getBackgroundColor(value)
    const sliderStyle = getSliderStyle(value)


    if (value <= 20) {
        return (
            <div className="mx-12 relative">

                <input type="range" step={5} min={0} max={20} list="tickmarks" className="h-3 w-full appearance-none rounded-full" disabled value={value}
                    style={{ background: sliderStyle }} />

                <datalist id="tickmarks">
                    <option value="0" label="0" />
                    <option value="5" label="5" />
                    <option value="10" label="10" />
                    <option value="15" label="15" />
                    <option value="20" label="20" />
                </datalist>

                <div ref={sliderThumbRef} className='datalist-thumb'
                    style={{ left: `${value / 20 * 100}%`, backgroundColor: backgroundColor }} >
                    {value}
                </div>

            </div>
        )
    }
    else if (value <= 40) {
        return (
            <div className="mx-12 relative">

                <input type="range" step={5} min={20} max={40} list="tickmarks" className="h-3 w-full appearance-none rounded-full" disabled value={value}
                    style={{ background: sliderStyle }} />

                <datalist id="tickmarks">
                    <option value="20" label="20" />
                    <option value="25" label="25" />
                    <option value="30" label="30" />
                    <option value="35" label="35" />
                    <option value="40" label="40" />
                </datalist>

                <div ref={sliderThumbRef} className='datalist-thumb' style={{ left: `${(value - 20) / 20 * 100}%`, backgroundColor: backgroundColor }} >
                    {value}
                </div>
            </div>
        )
    }

    else if (value <= 60) {
        return (
            <div className="mx-12 relative">

                <input type="range" step={5} min={40} max={60} list="tickmarks" className="h-3 w-full appearance-none rounded-full" disabled value={value}
                    style={{ background: sliderStyle }} />

                <datalist id="tickmarks">
                    <option value="40" label="40" />
                    <option value="45" label="45" />
                    <option value="50" label="50" />
                    <option value="55" label="55" />
                    <option value="60" label="60" />
                </datalist>

                <div ref={sliderThumbRef} className='datalist-thumb' style={{ left: `${(value - 40) / 20 * 100}%`, backgroundColor: backgroundColor }} >
                    {value}
                </div>
            </div>
        )
    }

    else if (value <= 80) {
        return (
            <div className="mx-12 relative">

                <input type="range" step={5} min={60} max={80} list="tickmarks" className="h-3 w-full appearance-none rounded-full" disabled value={value}
                    style={{ background: sliderStyle }} />

                <datalist id="tickmarks">
                    <option value="60" label="60" />
                    <option value="65" label="65" />
                    <option value="70" label="70" />
                    <option value="75" label="75" />
                    <option value="80" label="80" />
                </datalist>

                <div ref={sliderThumbRef} className='datalist-thumb' style={{ left: `${(value - 60) / 20 * 100}%`, backgroundColor: backgroundColor }} >
                    {value}
                </div>
            </div>
        )
    }

    else if (value <= 100) {
        return (
            <div className="mx-12 relative">

                <input type="range" step={5} min={80} max={100} list="tickmarks" className="h-3 w-full appearance-none rounded-full" disabled value={value}
                    style={{ background: sliderStyle }} />

                <datalist id="tickmarks">
                    <option value="80" label="80" />
                    <option value="85" label="85" />
                    <option value="90" label="90" />
                    <option value="95" label="95" />
                    <option value="100" label="100" />
                </datalist>

                <div ref={sliderThumbRef} className='datalist-thumb' style={{ left: `${(value - 80) / 20 * 100}%`, backgroundColor: backgroundColor }} >
                    {value}
                </div>
            </div>
        )
    }

    else if (value <= 120) {
        return (
            <div className="mx-12 relative">

                <input type="range" step={5} min={100} max={120} list="tickmarks" className="h-3 w-full appearance-none rounded-full" disabled value={value}
                    style={{ background: sliderStyle }} />

                <datalist id="tickmarks">
                    <option value="100" label="100" />
                    <option value="105" label="105" />
                    <option value="110" label="110" />
                    <option value="115" label="115" />
                    <option value="120" label="120" />
                </datalist>

                <div ref={sliderThumbRef} className='datalist-thumb' style={{ left: `${(value - 100) / 20 * 100}%`, backgroundColor: backgroundColor }} >
                    {value}
                </div>
            </div>
        )
    }

    else if (value <= 140) {
        return (
            <div className="mx-12 relative">

                <input type="range" step={5} min={120} max={140} list="tickmarks" className="h-3 w-full appearance-none rounded-full" disabled value={value}
                    style={{ background: sliderStyle }} />

                <datalist id="tickmarks">
                    <option value="120" label="120" />
                    <option value="125" label="125" />
                    <option value="130" label="130" />
                    <option value="135" label="135" />
                    <option value="140" label="140" />
                </datalist>

                <div ref={sliderThumbRef} className='datalist-thumb' style={{ left: `${(value - 120) / 20 * 100}%`, backgroundColor: backgroundColor }} >
                    {value}
                </div>
            </div>
        )
    }
    else if (value <= 160) {
        return (
            <div className="mx-12 relative">

                <input type="range" step={5} min={140} max={160} list="tickmarks" className="h-3 w-full appearance-none rounded-full" disabled value={value}
                    style={{ background: sliderStyle }} />

                <datalist id="tickmarks">
                    <option value="140" label="140" />
                    <option value="145" label="145" />
                    <option value="150" label="150" />
                    <option value="155" label="155" />
                    <option value="160" label="160" />
                </datalist>

                <div ref={sliderThumbRef} className='datalist-thumb' style={{ left: `${(value - 140) / 20 * 100}%`, backgroundColor: backgroundColor }} >
                    {value}
                </div>
            </div>
        )
    }

    else if (value <= 180) {
        return (
            <div className="mx-12 relative">

                <input type="range" step={5} min={160} max={180} list="tickmarks" className="h-3 w-full appearance-none rounded-full" disabled value={value}
                    style={{ background: sliderStyle }} />

                <datalist id="tickmarks">
                    <option value="160" label="160" />
                    <option value="165" label="165" />
                    <option value="170" label="170" />
                    <option value="175" label="175" />
                    <option value="180" label="180" />
                </datalist>

                <div ref={sliderThumbRef} className='datalist-thumb bg-[#394AB7]' style={{ left: `${(value - 160) / 20 * 100}%`, backgroundColor: backgroundColor }} >
                    {value}
                </div>
            </div>
        )
    }

    else {
        return (

            <div className="mx-12 relative">

                <input type="range" step={25} min={180} max={200} list="tickmarks" className="h-3 w-full appearance-none rounded-full" disabled
                    style={{ background: sliderStyle }} value={value} />

                <datalist id="tickmarks">
                    <option value="180" label="180" />
                    <option value="185" label="185" />
                    <option value="190" label="190" />
                    <option value="195" label="195" />
                    <option value="200" label="200" />
                </datalist>

                <div ref={sliderThumbRef} className='datalist-thumb bg-[#8C57CE]' style={{ left: `${(value - 180) / 20 * 100}%` }}>
                    {value}
                </div>

            </div>
        )
    }
}

Slider.propTypes = {
    value: PropTypes.number
}

export default Slider