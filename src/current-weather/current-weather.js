import { useState, useEffect } from 'react';
import './current-weather.css'

const CurrentWeather = ({ data,forecast }) => {

    let [icon, setIcon] = useState('icons/01d.png');


    useEffect(() => {
        if (data && data.weather && data.weather.length > 0) {
            const iconCode = data.weather[0].icon;
            switch (iconCode) {

                case '01n':
                    setIcon('icons/01n.png');
                    break;

                case '02d':
                    setIcon('icons/02d.png');
                    break;

                case '02n':
                    setIcon('icons/02n.png');
                    break;

                case '03d':
                    setIcon('icons/03d.png');
                    break;


                case '03n':
                    setIcon('icons/03n.png');
                    break;

                case '04d':
                    setIcon('icons/04d.png');
                    break;

                case '04n':
                    setIcon('icons/04n.png');
                    break;

                case '09d':
                    setIcon('icons/09d.png');
                    break;

                case '09n':
                    setIcon('icons/09n.png');
                    break;

                case '10d':
                    setIcon('icons/10d.png');
                    break;


                case '10n':
                    setIcon('icons/10n.png');
                    break;


                case '11d':
                    setIcon('icons/11d.png');
                    break;

                case '11n':
                    setIcon('icons/11n.png');
                    break;


                case '13d':
                    setIcon('icons/13d.png');
                    break;


                case '13n':
                    setIcon('icons/13n.png');
                    break;


                case '50d':
                    setIcon('icons/50d.png');
                    break;

                case '50n':
                    setIcon('icons/50n.png');
                    break;


                case 'unknown':
                    setIcon('icons/unknown.png');
                    break;


                default:
                    setIcon('icons/01d.png');
                    break;
            }
        }
    }, [data]);


    if (!data) {
        return null; // Επιστρέφετε null αν το data είναι null
    }


    const dt_txt = forecast.list[0].dt_txt; // Πρόσβαση στο πρώτο στοιχείο της λίστας και στο πεδίο dt_txt
    const dateParts = dt_txt.split(' ')[0].split('-'); // Διαχωρισμός της συμβολοσειράς και των τμημάτων της ημερομηνίας
    const firstDayWithoutTime = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Σύνθεση της νέας μορφής ημερομηνίας
  

    return (
        <div className="current-weather-wrapper">
            <div className="top">
                <div className="top-words">
                    <p className="city">
                        {/* Belgrade */}
                        {data.city}
                    </p>


                    <p className='date'>
                        {firstDayWithoutTime}
                    </p>

                    <p className="weather-description">
                        {/* Sunny */}
                        {data.weather[0].main}

                    </p>
                </div>


                {/* <img alt='weather' className='weather-icon' src='icons/01d.png'  /> */}
                <img alt='weather' className='weather-icon' src={icon} />

            </div>




            <div className="bottom">
                {/* <p className="temperature">20°C</p> */}
                <p className="temperature">{data.main.temp}</p>

                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label top">Details:</span>
                    </div>

                    <div className="parameter-row">
                        <span className="parameter-label">Feels Like</span>
                        <span className="parameter-value">{data.main.feels_like}</span>
                    </div>


                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        {/* <span className="parameter-value">35%</span> */}
                        <span className="parameter-value">{data.main.humidity}%</span>

                    </div>

                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        {/* <span className="parameter-value"> 4 km/h</span> */}
                        <span className="parameter-value"> {data.wind.speed}</span>

                    </div>



                </div>



            </div>
        </div>
    );
}

export default CurrentWeather;