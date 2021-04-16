import React, { useEffect, useState } from "react";

import {  Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';
import AddMovieForm from './components/AddMovieForm'
import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  // const [favoriteMovies, setFavoriteMovies] = useState([]);
  
  useEffect(()=>{
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        console.log(`App: useEffect: get: res`, res)
        setMovies(res.data);
      })
      .catch(err => {
        console.log(`App: useEffect: get: err`,err);
      });
  }, []);
// debugger
  const deleteMovie = (id)=> {
    // 
    axios.delete(`http://localhost:5000/api/movies/${id}`)
.then(res=>{
  // const deletedMovie = res.data.find(movie => movie.id == Number(id))
    console.log(`Movie: deleteMovie: delete: res`, res)
    console.log('movies', movies)
    const deletedMovie = movies.find(movie=>movie.id === Number(id))
    console.log('deletedMovie = ',deletedMovie)
    
})
.catch(err=>{
    console.log(`App: deleteMovie: delete: err`, err)
    
  })
}
  
  // const addToFavorites = (movie) => {
    
  // }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          {/* <FavoriteMovieList favoriteMovies={favoriteMovies}/> */}
        
          <Switch>
            <Route path="/movies/edit/:id">
            <EditMovieForm movies={movies} setMovies={setMovies}/>
            </Route>
            <Route path="/movies/add">
            <AddMovieForm movies={movies} setMovies={setMovies}/>
            </Route>
            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie}/>
            </Route>

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

