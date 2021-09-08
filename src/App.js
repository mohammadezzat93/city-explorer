import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Header from './component/Header';
import Footer from './component/Footer';
import Weather from './component/Weather';
import Movie from './component/Movie';
import './App.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lat: '',
            lon: '',
            name: '',
            mapFlag: false,
            err: false,
            weatherError: false,
            Weather: false,
            weatherArr: [],
            movieArr: [],
            movieFlag: false
        }
    }

    getData = async e => {
        e.preventDefault();
        let cityName = e.target.name.value;

        let myKey = process.env.REACT_APP_Key;
        // let myKey2 = process.env.Weather_APP_Key;
        // let myKey3 = process.env.movie_APP_Key;
        const URL1 = `https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${cityName}&format=json`;
        const URL2 = `https://city-explorer-api3.herokuapp.com/weather?city=${cityName}`;
        const URL3 = `https://city-explorer-api3.herokuapp.com/movies?query=${cityName}`;

        try {
            let newLocation1 = await axios.get(URL1);
            let newLocation2 = await axios.get(URL2);
            let newMovie = await axios.get(URL3);
            this.setState({
                lat: newLocation1.data[0].lat,
                lon: newLocation1.data[0].lon,
                name: cityName,
                weatherArr: newLocation2.data,
                movieArr: newMovie.data,
                mapFlag: true,
            });

            console.log(newLocation1.data);
        } catch {
            this.setState({
                err: true,
            });
        }

    };

    render() {
        return (
            <>
                <Header />

                <Form onSubmit={this.getData}>
                    <Form.Group className="mb-3" controlId="horned">
                        <Form.Label>Where Would you like to explor ?</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Name of The city" />
                        <Button variant="primary" type="submit">Explore !</Button>

                    </Form.Group>
                </Form>

                <h1>Welcome to {this.state.name}</h1>
                <h5>{this.state.name}  is located at {this.state.lat} by {this.state.lon}</h5>

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

                {this.state.mapFlag && (
                    <Weather
                        weather={this.state.weatherArr.map((item) => {
                            return (
                                <>
                                    <Alert><h3 className="date">Date: {item.date}</h3></Alert>
                                    <Alert><h4 className="date">Description: {item.desc}</h4></Alert>
                                </>
                            );
                        })}
                    />
                )}
                <Row xs={1} md={3} className="g-4">
                    {this.state.mapFlag && (
                        <Movie
                            movie={this.state.movieArr.map((item) => {
                                return (
                                    <>
                                        {/* <p>Title: {item.title}</p>
                                    <p>Overview: {item.overview}</p>
                                    <p>Average_votes: {item.average_votes}</p>
                                    <p>Total_votes: {item.total_votes}</p>
                                    <p>Popularity: {item.popularity}</p>
                                    <p>Released_on: {item.released_on}</p> */}


                                        <Col>
                                            <Card style={{ width: '25rem' }}>

                                                <Card.Img variant="top" src={item.image_url} width="200" height="200" />

                                                <Card.Body className="description">

                                                    <Card.Title className="title">Title: {item.title}</Card.Title>

                                                    <Card.Text className="description"></Card.Text>

                                                    <Card.Text className="description">
                                                        Average_votes: 💖 {item.average_votes}
                                                    </Card.Text>
                                                    <Card.Text className="description">
                                                        Total_votes: 💖 {item.total_votes}
                                                    </Card.Text>
                                                    <Card.Text className="description">
                                                        Popularity: {item.popularity}
                                                    </Card.Text>
                                                    <Card.Text className="description">
                                                        Released_on: {item.released_on}
                                                    </Card.Text>

                                                </Card.Body>
                                            </Card>
                                        </Col>

                                    </>
                                );
                            })}
                        />
                    )}
                </Row>
                <br></br>
                <Footer />
            </>
        );
    }
}

export default App;

