import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Header from './component/Header';
import Footer from './component/Footer';
// import Weather from './component/Weather';
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
        }
    }

    getData = async e => {
        e.preventDefault();

        let cityName = e.target.cityName.value;

        let Key = process.env.REACT_APP_Key;
        let URL = `https://eu1.locationiq.com/v1/search.php?key=${Key}&q=${cityName}&zoom=18&format=json`;



        // 2 : axios
        try {
            let result = await axios.get(URL);
            console.log(result);

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
                    <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.lat},${this.state.lon}&zoom=[1-18]&size=2000x400`} alt='map' />
                }

                {/* <h1>Welcome to {this.result2}</h1> */}

                {this.state.err &&
                    <>
                        <Alert>
                            Sorry, Can Not Found Location!
                        </Alert>
                    </>
                }

                <Footer />
            </>
        );
    }
}

export default App;