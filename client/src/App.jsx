import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom"
import Navbar from './components/Navbar';
import Form from './components/Form';
import AuthForm from './components/AuthForm';
import TedList from './components/TedList';
import { UserContext } from './context/UserContext';
import TedDetail from './components/TedDetail';


function App() {

  const {token, allTeds} = useContext(UserContext)



  return (
    <>
      <Navbar />
      <div id="app">
        <Routes>
        <Route path ="/" element = {token ? <Navigate to = "/tedList"/> : <AuthForm />} />
        <Route path ="/form" element = {!token ? <Navigate to ="/" /> : <Form /> }/>
        <Route path = "/tedList" element = {!token ? <Navigate to ="/" /> : <TedList />} />
        <Route path = "/tedList/:tedId" element = {!token ? <Navigate to ="/" /> : <TedDetail allTeds = {allTeds}/>} />
        </Routes>
      </div>
    </>

  );
}

export default App;