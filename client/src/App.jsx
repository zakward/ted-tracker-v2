import React from 'react';
import {Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar';
import Form from './components/Form';
import AuthForm from './components/AuthForm';
import TedList from './components/TedList';


function App() {
  return (
    <>
      <Navbar />
      <div id="app">
        <Routes>
        <Route path ="/" element = {<AuthForm />} />
        <Route path ="/form" element = {<Form /> }/>
        <Route path = "/tedList" element = {<TedList />} />
        </Routes>
      </div>
    </>

  );
}

export default App;