import React, { useState } from 'react'
import humidity from './components/humidity.svg'
import wind from './components/wind.svg'

function Weather() {
    const [city,setCity] = useState("")
    const [weatherData, setWeatherData] = useState({})
    const [londonWeather,setLondonWeather] = useState({})
    const submitHandle = ((e)=>{
      e.preventDefault();
      search(city)
    })
    const londonData = async (london)=> {
      try {
        const londonUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
        const londonResponse = await fetch(londonUrl);
        const londonData = await londonResponse.json();
        setLondonWeather({
          humidity : londonData.main.humidity,
          temperature : Math.round(londonData.main.temp),
          windSpeed : londonData.wind.speed,
          location : londonData.name,
          icon : `https://openweathermap.org/img/wn/${londonData.weather[0].icon}@2x.png` ,
        })
      } catch (error) {
        console.log(error)
      }
    }
    londonData(city)
    const search = async (city)=>{
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        setWeatherData({
          humidity : data.main.humidity,
          temperature : Math.round(data.main.temp),
          windSpeed : data.wind.speed,
          location : data.name,
          icon :`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        })
      } catch (error) {
        console.log(error)
      }
    }
    
  return (
  <>
    <div className='w-full rounded-lg  h-full bg-blue-500 text-white border-none m-auto'>
      <div className='flex'>
        <input 
        type="text" 
        placeholder='Enter city name' 
        className='p-2 m-6 mr-2 rounded-lg w-full max-h-10' 
        onChange={(e)=> setCity(e.target.value)}
        />
        <button onClick={submitHandle} className='rounded-lg mr-6 mt-6 max-h-10'>Search</button>
        </div>
        <div className='flex justify-center size-11/12'>
        <img src={weatherData.icon || londonWeather.icon} alt="Icon" className='h-full w-full'/>
        </div>
        <div className='text-5xl'>{weatherData.location || londonWeather.location}</div>
        <div className='text-5xl mt-8'>{weatherData.temperature || londonWeather.temperature}°C</div>
        
        <div className='flex gap-2 p-6'>
          <div className='size-12'>
        <img src={humidity} alt="humidity" className='h-full w-full text-gray'/>
          </div>
        <div className='mr-14 '>{weatherData.humidity || londonWeather.humidity}%
          <h2>Humidity</h2>
        </div>
        <div className='size-12'>
        <img src={wind} alt="wind" className='h-full w-full text-gray'/>
        </div>
        <div className='font-bold'>{weatherData.windSpeed || londonWeather.windSpeed}Km/h 

        <h2 className='font-bold'>Wind Speed</h2>
        </div>
        
        </div>

    </div>
    </>
  )
}

export default Weather