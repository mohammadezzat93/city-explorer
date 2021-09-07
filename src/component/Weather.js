
import React from 'react';

class Weather extends React.Component{
    render()
    {
        return(
            <>
         {this.props.Weather &&
         this.props.data.map((item)=>(
             <>
             <p>{item.description}</p>
             <p>{item.date}</p>
             
             </>
         ))}


            </>
        )
    }
}
export default Weather;
