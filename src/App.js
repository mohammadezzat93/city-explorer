import axios from 'axios';
import React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lat: '',
            lon: '',
            zoom : '',
            displayName: '',
            mapFlag: false,
            err: false
        }
    }

    getData = async e => {
        e.preventDefault();

        let cityName = e.target.cityName.value;

        let Key = 'pk.024f6e8bc1742f77c30108e11db494a8';
        let URL = `https://eu1.locationiq.com/v1/search.php?key=${Key}&q=${cityName}&format=json`;
        //  console.log('Show', show);


        // 2 : axios
        try {
            let result = await axios.get(URL);
            console.log(result);

            this.setState({
                displayName: result.data[0].display_name,
                lat: result.data[0].lat,
                lon: result.data[0].lon,
                zoom : result.data[0].boundingbox,
                mapFlag: true

            });
        }
        catch {
            this.setState({
                err: true
            })
        }

    }


    render() {
        return (
            <>
                <form onSubmit={this.getData}>
                    <input type="text" name="cityName" />
                    <input type="submit" value="Show" />
                </form>

                <h3>{this.state.displayName}</h3>
                <h3>{this.state.lat}</h3>
                <h3>{this.state.lon}</h3>
                <h3>{this.state.boundingbox}</h3>

                {this.state.mapFlag &&
                    <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.024f6e8bc1742f77c30108e11db494a8&center=${this.state.lat},${this.state.lon} &zoom=${this.state.boundingbox} `} alt='map' />
                }
                {this.state.err && <p>Sorry, Not Found</p>}
            </>
        );
    }
}

export default App;