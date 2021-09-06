import React from 'react';

class Weather extends React.Component{
    render()
    {
        return(
            <>
         {this.props.flageWeather && this.props.data.map((item)=>(
             <>
             <p>data:{item.data}</p>
             <p>des:{item.description}</p>
             </>
         ))}


            </>
        )
    }
}
export default Weather;