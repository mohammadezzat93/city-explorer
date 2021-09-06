import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Header from './component/Header';
import Footer from './component/Footer';
import Weather from './component/Weather';
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
            forecast: {},
            flageWeather: false
        }
    }

    getData = async e => {
        e.preventDefault();

        let cityName = e.target.cityName.value;

        let Key = 'pk.0457957969e90c41969c65df34a35700';
        let URL = `https://eu1.locationiq.com/v1/search.php?key=${Key}&q=${cityName}&zoom=18&format=json`;
        let URL2 = `${process.env.PORT}/getWeatherinfo?cityName=${cityName}`;


        // 2 : axios
        try {
            let result = await axios.get(URL);
            let result2 = await axios.get(URL2);
            console.log(result);

            this.setState({
                displayName: result.data[0].display_name,
                lat: result.data[0].lat,
                lon: result.data[0].lon,
                mapFlag: true,
                flageWeather: true,
                forecast: result2.data

            });
        }
        catch {
            this.setState({
                err: true
            })
        }

        try {
            // let result2 = await axios.get(URL2);
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
                    <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.0457957969e90c41969c65df34a35700&center=${this.state.lat},${this.state.lon}&zoom=[1-18]&size=2000x400`} alt='map' />
                }

                {/* <h1>Welcome to {this.result2}</h1> */}

                {this.state.err &&
                    <>
                        <Alert>
                            Sorry, Can Not Found Location!
                        </Alert>
                    </>
                }

                <Weather
                    data={this.state.forecast}
                    flageWeather={this.state.flageWeather}
                />

                <Footer />
            </>
        );
    }
}

export default App;