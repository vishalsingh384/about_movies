import React, { Component } from 'react'
import { movies } from './getMovies'

export default class List extends Component {
  constructor(){
    super();
    this.state={hover:""}
  }
  handleEnter=(id)=>{
    this.setState({
      hover:id
    })
  }
  handleLeave=()=>{
    this.setState({
      hover:""
    })
  }
  render() {
    let movie=movies.results;
    return (
        <>
            {movie.length==0?(
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) :(
            <>
            <h3 className="text-center">
                <strong>Trending</strong>
            </h3>
            <div className='movies-list'>
                {
                    movie.map((movieObj)=>(
                        <div className='card movie-card' onMouseEnter={()=>this.handleEnter(movieObj.id)} onMouseLeave={this.handleLeave}>
                        <img src={`http://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} 
                        class="card-img-top movie-img" alt="..."/>
                            <h5 className="card-title movie-title">{movieObj. original_title}</h5>
                            <div className='button-wrapper'>
                              {this.state.hover==movieObj.id&&(
                              <a href="#" className="btn btn-primary movie-button">Add to Favorites</a>
                              )}
                            </div>
                    </div>
                    ))
                }
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
            </div>
            </>
          )}
        </>
    );
  }
}
