import React from 'react';

const Weather = props =>
{
    return(
    <div className="container">
        <div className="cards pt-4">
            <h1>{props.city},{props.country}</h1>
            <h5 className="py-4">
                <i className={`wi ${props.weathericon} display-1`}></i>
            </h5>
            <h1 className="py-2">{props.temp_celsius}&deg;</h1>
            {/*show min and max value*/}
            {minmaxTemp(props.min_temp,props.max_temp)}
            <h4 className="py-4">{props.description}</h4>
        </div>        
    </div>
    );
}

function minmaxTemp(min,max)
{
    return(
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
    );
}

export default Weather;