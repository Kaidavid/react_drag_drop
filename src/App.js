import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainBoard from './components/MainBoard';
import { data } from './shared/data';


function App() {

  return (
    <div className="App">
      <div>
        <MainBoard data={data}/>
      </div>
      <div className="lead d-flex justify-content-center">
        <p><em>Few bugs to fix ^^</em></p>
      </div>
      
    </div>
  );
}

export default App;
