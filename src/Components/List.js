import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios' //You need to import axios from 'axios', not import { axios } from 'axios'.
// This is because the axios module default exports the axios class. It's not a named export so it can't be imported using the method you tried.
import { API_KEY } from '../secrets';

export default class List extends Component {
  constructor(){
    super();
    this.state={
      hover:"",
      currPage:1,
      movies:[],
      parr:[1]  //ab tak main konse page par hu , or what page result am i showing
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
  changeMovies=async ()=>{
    let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`);
    this.setState({  //one might wonder that render call nahi hoga yaha se coz "res.data.results" same hi array laa raha jo movies me already thi, 
      //but note that setState calls render when either the state change ofc and if the LOCATION(address) changes. Yaha movies ka address change ho raha since 
      // use ek naya array assign ho raha and array to address hi store karta hai
      movies:[...res.data.results]
    })
  }
  handlePrev=async()=>{
    if(this.state.currPage>1){
      this.state.currPage=this.state.currPage-1;
      let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`);
      this.setState({
        currPage:this.state.currPage,
        movies:[...res.data.results]
      },this.changeMovies)
    }
  }
  handlePage=async (pageNum)=>{
    let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page==${pageNum}`)
    this.state.currPage=pageNum;
    this.setState({
      currPage:this.state.currPage,
      movies:[...res.data.results]
    },this.changeMovies)
  }
  handleNext=()=>{
    let tempArr=[];
    for(let i=1;i<=this.state.parr.length+1;i++){
      tempArr.push(i);//tempArr=[1,2]
    }
    this.setState({
      parr:[...tempArr],//parr=[1,2]
      currPage:this.state.currPage+1
    },this.changeMovies);//->setState takes a callback fn too, taaki agar koi function call karna ho only and only uske execute ho jaane ke baad to hum kar sakte. 
    // Because setState is async to as shown in next line, the fn gets called before setState finishes. So to ensure synchonouus behaviour, we can pass the function as callback fn in setState
    // this.changeMovies();-> this won't work because setState asyn hai. To jab tak wo hoga tab tak 99.99% of the time ye hoga ki, changeMovies() call ho jaayegi
  }
  async componentDidMount(){
    let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`);
    this.setState({
      movies:[...res.data.results]
    })
  }
  render() {
    let movie=this.state.movies;
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
          )}
        </>
    );
  }
}
