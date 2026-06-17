import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {

   const navigate = useNavigate();

   const toMovies = () => {
      navigate("/movies");
   }
   
  return (
   <div id="about" className='container'>
      <h1>Welcome To Silver Screen World</h1>
      <h2>The Ultimate Destination<br />To Search Your All-Time Favorite Movies.</h2>
      <div className='about__description'>
         <p> Here you can search our extensive library of movies by entering either a movie title keyword. You can then request the results to be sorted alphabetically or chronologically. Make your choice from those results and we will show you additional details about your chosen movie.
         </p><br />
      </div>
      <button className="nav__link reg-btn" onClick={toMovies}> Search Movies</button>
   </div>
  );
};

export default About;