import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Banner extends Component {
  render() {
    let movie=movies.results[0];
    // let movie="";
    return (
      <>
        {movie==""?(
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        ):(
            <div className='card'>
                <img src="http://image.tmdb.org/t/p/original/6EdKBYkB1ssgGjc249ud1L55o8d.jpg" class="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{movie. original_title}</h5>
                    <p className="card-text">{movie.overview}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        )}
      </>
    )
  }
}
