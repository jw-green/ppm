import React from 'react';
import './App.scss';
// import ppm from './assets/ppm.svg'
// import Headline from './components/headline/Headline';
import Stage from './components/stage/Stage';

function App() {
  return (
    <div className="App">
      {/* <Headline title="Personal Package Manager" img={ppm}/> */}
      <Stage/>
    </div>
  );
}

export default App;
