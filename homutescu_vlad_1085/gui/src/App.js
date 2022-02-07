import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Book } from "./components/Book";
import { VirtualShelf } from "./components/VirtualShelf";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/book" exact element={<Book />}></Route>
          <Route path="/virtualshelf" exact element={<VirtualShelf />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
