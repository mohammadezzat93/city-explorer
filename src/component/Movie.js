import React from 'react';

class Movie extends React.Component {
    render() {
        return (
            <>
                {this.props.movieFlage && this.props.data.map(item => {
                    <>
                        <p> {item.title} </p>
                        <p> {item.overview} </p>
                        <p> {item.vote_average} </p>
                        <p> {item.vote_count} </p>
                    </>
                })}

            </>
        )
    }
}

export default Movie;