import Search from './components/search/Search';
import './App.css';
import CurrentWeather from './current-weather/current-weather';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  let [firstDifferentDateWithoutTime, setFirstDifferentDateWithoutTime] = useState(null);
  let [thirdDay, setThirdDay] = useState(null);
  let [fourthDay, setFourthDay] = useState(null);
  let [fifthDay, setFifthDay] = useState(null);

  const dayIndex = [];


  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetch = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=736b7f2628a8fca1a8cba5acb85b42b6&units=metric`);
    const forecastWeatherFetch = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=736b7f2628a8fca1a8cba5acb85b42b6&units=metric`);

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });

        let firstDtTxt = forecastResponse.list[0].dt_txt;
        let firstDateWithoutTime = firstDtTxt.split(' ')[0];


        for (let i = 1; i < forecastResponse.list.length; i++) {
          const currentDateWithoutTime = forecastResponse.list[i].dt_txt.split(' ')[0];
          if (currentDateWithoutTime !== firstDateWithoutTime) {

            dayIndex.push(i+5,i+13,i+21,i+29);
            console.log(dayIndex);

            firstDifferentDateWithoutTime = currentDateWithoutTime;
            thirdDay = forecastResponse.list[i + 8].dt_txt.split(' ')[0];
            fourthDay = forecastResponse.list[i + 16].dt_txt.split(' ')[0];
            fifthDay = forecastResponse.list[i + 24].dt_txt.split(' ')[0];
            
            break;
          }
        }


        console.log(forecast);

        const datePartsSecond = firstDifferentDateWithoutTime.split("-");
        const newSecondDate = `${datePartsSecond[2]}/${datePartsSecond[1]}/${datePartsSecond[0]}`

        const datePartsThird = thirdDay.split("-");
        const newThirdDate = `${datePartsThird[2]}/${datePartsThird[1]}/${datePartsThird[0]}`

        const datePartsFourth = fourthDay.split("-");
        const newFourthDate = `${datePartsFourth[2]}/${datePartsFourth[1]}/${datePartsFourth[0]}`

        const datePartsFifth = fifthDay.split("-");
        const newFifthDate = `${datePartsFifth[2]}/${datePartsFifth[1]}/${datePartsFifth[0]}`

        console.log(firstDifferentDateWithoutTime, thirdDay, fourthDay, fifthDay);

        setFirstDifferentDateWithoutTime(newSecondDate);
        setThirdDay(newThirdDate);
        setFourthDay(newFourthDate);
        setFifthDay(newFifthDate);
      })
      .catch((error) => console.log(error));

  }


  return (
    <div className="App">
      <div className="title"><h3>Weather App</h3></div>
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather data={currentWeather} forecast={forecast} />
    </div>
  );
}

export default App;
