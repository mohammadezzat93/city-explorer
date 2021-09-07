import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Header from './component/Header';
import Footer from './component/Footer';
// import Weather from './component/Weather';
import Movie from './component/Movie';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lat: '',
            lon: '',
            displayName: '',
            mapFlag: false,
            err: false,
            weatherError: false,
            Weather: false,
            weatherArray: [],
            movie: {},
            movieFlag: false
        }
    }

    getData = async e => {
        e.preventDefault();

        let cityName = e.target.cityName.value;

        this.getWeather(cityName);
        let Key = process.env.REACT_APP_Key;
        let URL = `https://eu1.locationiq.com/v1/search.php?key=${Key}&q=${cityName}&zoom=18&format=json`;



        // 2 : axios
        try {
            let result = await axios.get(URL);
            console.log('result', result);

            this.setState({
                displayName: result.data[0].display_name,
                lat: result.data[0].lat,
                lon: result.data[0].lon,
                mapFlag: true,

            });
        }
        catch {
            this.setState({
                err: true
            })
        }

    }

    getWeather = async (cityName) => {

        let URL2 = `https://city-explorer-api3.herokuapp.com/weather?cityName=${cityName}`;

        try {
            if (cityName === 'Amman' || cityName === 'Paris' || cityName === 'Seattle') {

                let weatherData = await axios.get(URL2);

                console.log('weatherData', weatherData.data);
                console.log('helllllllllllo');

                this.setState({
                    weatherArray: weatherData.data,
                    Weather: true,

                })

            }
            else {
                this.setState({
                    weatherError: true
                });
            }

        }
        catch {
            this.setState({
                weatherError: true
            });

        }

    }

    getWeather = async (cityName) => {

        let URL3 = `https://city-explorer-api3.herokuapp.com/Movie?cityName=${cityName}`;

        try {
            let movieURL = await axios.get(URL3);

            this.setState({
                movie: movieURL.data,
                movieFlag: true

            })
        }
        catch {
            console.log('error');
            this.setState({
                err: true
            })
        }

    }

    render() {
        return (
            <>

                <Header />

                <Form onSubmit={this.getData}>
                    <Form.Group className="mb-3" controlId="horned">
                        <Form.Label>Where Would you like to explor ?</Form.Label>
                        <Form.Control type="text" name="cityName" placeholder="Name of The city" />
                        <Button variant="primary" type="submit">Explore !</Button>

                    </Form.Group>
                </Form>

                <h1>Welcome to {this.state.displayName}</h1>
                <h5>{this.state.displayName}  is located at {this.state.lat} by {this.state.lon}</h5>

                {this.state.mapFlag &&
                    <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_Key}&center=${this.state.lat},${this.state.lon}&zoom=[1-18]&size=2000x400`} alt='map' />
                }

                {this.state.err &&
                    <>
                        <Alert>
                            Sorry, Can Not Found Location!
                        </Alert>
                    </>
                }

                {/* {
                    this.state.Weather && this.state.weatherArray.map(item => {
                        return (
                            <>
                                <p>Date : {item.date}</p>
                                <p>Description : {item.desc} </p>
                            </>
                        )

                    })
                } */}
                <p> Display name : {this.state.displayName}</p>
                <p>Lat : {this.state.lat}</p>
                <p>Lon : {this.state.lon}</p>

                {/* {<Weather />} */}

                <Movie data={this.state.movie}
                       movieFlag={this.state.movieFlag} />

                <Footer />
            </>
        );
    }
}

export default App;
