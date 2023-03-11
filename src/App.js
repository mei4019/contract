import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Detail from './Detail';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>404</h1>}></Route>
        <Route path="/hjks123" element={<Home />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
      </Routes>
    </div>
  );
}

export default App;



