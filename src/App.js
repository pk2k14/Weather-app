import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';

const API_key = "2302f72004689a29147ddbf0f28db0b9";

class App extends React.Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined,
      icons:undefined,
      main:undefined,
      celsius:undefined,
      min_temp:undefined,
      max_temp:undefined,
      description:"",
      error:false,
    };

    this.weatherIcon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }
  }

  convertcelsius(temp){
    let cel = Math.floor(temp-273.15);
    return cel;
  }

  get_weathericon(icon,w_id)
  {
    if(w_id>=200 && w_id<=232 )
      this.setState({icons:this.weatherIcon.Thunderstorm});
    else if(w_id>=300 && w_id<=321 )
      this.setState({icons:this.weatherIcon.Drizzle});
    else if(w_id>=500 && w_id<=531 )
      this.setState({icons:this.weatherIcon.Rain});
    else if(w_id>=600 && w_id<=622 )
      this.setState({icons:this.weatherIcon.Snow});
    else if(w_id>=701 && w_id<=781 )
      this.setState({icons:this.weatherIcon.Atmosphere});
    else if(w_id>=801 && w_id<=804 )
      this.setState({icons:this.weatherIcon.Clouds});
    else
    this.setState({icons:this.weatherIcon.Clear});
  }

  getWeather = async(e)=>{

    e.preventDefault();
    const apicall= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);
    const response = await apicall.json();
    console.log(response);
    this.setState({
      city : response.name,
      country: response.sys.country,
      celsius:this.convertcelsius(response.main.temp),
      min_temp:this.convertcelsius(response.main.temp_min),
      max_temp:this.convertcelsius(response.main.temp_max),
      description:response.weather[0].description,
    });
    this.get_weathericon(this.weatherIcon,response.weather[0].id)
  }
  render(){
    return(
      <div className="App">
      <Form loadweather={this.getWeather}/>
      <Weather 
      city={this.state.city}
      country={this.state.country}
      min_temp={this.state.min_temp} 
      max_temp={this.state.max_temp}
      description={this.state.description}
      temp_celsius={this.state.celsius}
      weathericon={this.state.icons} />
    </div>
    );
  }
}

export default App;
