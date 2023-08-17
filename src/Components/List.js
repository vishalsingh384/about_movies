import React, { Component } from 'react';
import axios from 'axios';

export default class List extends Component {
    constructor(){
        super();
        this.state={
            hover:"",
            parr:[1],
            movies:[],
            currPage:1,
            fav:[]  //id of movies in local storage
        }
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

    async componentDidMount(){
        let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3234e957a20cc3489b9cc6c58e975bda&language=en-US&page=${this.state.currPage}`);        console.log(res);
        this.setState({
            movies:[...res.data.results]
        })
    }

    handleNext=()=>{
        let len=this.state.parr.length+1;
        this.setState({
            parr:[...this.state.parr,len],
            currPage:this.state.currPage+1
        },this.changeMovies);

    }

    handlePrev=()=>{
        if(this.state.currPage>1){
            let arr=[...this.state.parr];
            arr.pop();
            this.setState({
                parr:[...arr],
                currPage:this.state.currPage-1
            },this.changeMovies);
        }
    }

    handlePage=(pageNum)=>{
        this.setState({
            currPage:pageNum,
        },this.changeMovies)
    }

    changeMovies=async()=>{
        let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3234e957a20cc3489b9cc6c58e975bda&language=en-US&page=${this.state.currPage}`);        
        this.setState({
            movies:[...res.data.results]
        })
    }

    handleFav=(movieObj)=>{
        let localStorageMovies=JSON.parse(localStorage.getItem("movies"))||[];
        if(this.state.fav.includes(movieObj.id)){
            localStorageMovies=localStorageMovies.filter((mObj)=>{
                return mObj.id!=movieObj.id;
            })
        }else{
            localStorageMovies.push(movieObj);
        }

        localStorage.setItem("movies",JSON.stringify(localStorageMovies));
        let temp=localStorageMovies.map((mObj)=>{
            return mObj.id;
        })
        this.setState({
            fav:[...temp]
        })
    }

  render() {
    let movie=this.state.movies;
    return (
      <>
        {
            movie==""?(
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ):(
                <>
                    <h3 className='text-center'>
                        <strong>Trending</strong>
                    </h3>
                    <div className='movies-list'>
                        {
                            movie.map((movieObj)=>(
                                <div className='card movie-card' onMouseEnter={()=>this.handleEnter(movieObj.id)} onMouseLeave={this.handleLeave}>
                                <img src={`http://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} 
                                class="card-img-top movie-img" alt="..."/>
                                    <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                                    <div className='button-wrapper'>
                                        {this.state.hover==movieObj.id&&(
                                             <a className="btn btn-primary movie-button" onClick={()=>this.handleFav(movieObj)}>
                                                {this.state.fav.includes(movieObj.id)?"Remove from Favorites":"Add to Favorites"}
                                            </a>
                                        )}
                                    </div>
                            </div>
                            ))
                        }
                    </div>
                    <div className="pagination">
                        <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                            <a class="page-link"  aria-label="Previous" onClick={this.handlePrev}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                            </li>
                            {
                            this.state.parr.map(pageNum=>(
                                <li class="page-item">
                                <a class="page-link"  onClick={()=>this.handlePage(pageNum)}>
                                    {pageNum}
                                </a>
                                </li>
                            ))
                            }
                            <li class="page-item">
                            <a class="page-link"  aria-label="Next" onClick={this.handleNext}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                            </li>
                        </ul>
                        </nav>
                    </div> 
                </>
            )
        }
      </>
    )
  }
}
