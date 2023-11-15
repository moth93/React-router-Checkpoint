import {useState,useEffect} from 'react';

import "./App.css";


import {Routes,Route } from "react-router-dom";
import info from "./componant/Data.js"
import AddMovie from './componant/AddMovie.js';
import Filtring from './componant/Filter.js';
import MovieList from './componant/MovieList.js';
import MovieDescription from './componant/MovieDescription.js';

function App(){
  
  const [list,setList] = useState(info);
  const [filtredList, setFiltredList] = useState(list);
  const [rate,setRate] = useState(0);
  const [keyword, setKeyword] = useState("");

  function adding(movie){
    if( movie.title && movie.img && movie.description && movie.posterURL ) {
      setList([...list, movie]);
    }
  }


  function filter(key, rate){
    setKeyword(key);
    setRate(rate);
    setFiltredList(list.filter( (element)=>{ return ( (element.title.toLowerCase().includes(key.toLowerCase())) && (element.rating >= rate) ) } ));
  }

  useEffect(()=>{ filter(keyword,rate); },[list]);


  return(
    <div className="App">
      <Routes>
        {/* SHOW THIS TWO COMPONENTS IF WE ARE IN THE ROOT PATH */}
        <Route path="/"  element={ <> <Filtring filter={filter}/>  <MovieList list={filtredList} /> <AddMovie adding={adding} />   </> } />
        {/*  SHOW THIS COMPONENT IF WE ARE IN : /:id  */}
        <Route path="/:id" element={ <MovieDescription list={list} /> } />
      </Routes>
    </div>
      );
}

export default App;
