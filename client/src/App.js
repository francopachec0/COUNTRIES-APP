import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './components/LandingPage.jsx'
import Home from "./components/Home";
import CreateActivity from './components/CreateActivity'
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = '/' element = {<LandingPage/>}/>
        <Route path = '/home' element = {<Home/>}/>
        <Route path= '/activity' element = {<CreateActivity/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
