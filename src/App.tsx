import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Diagnosis from "./Diagnosis";
import MenuLinks from "./MenuLinks";
import Chat from "./components/Chat";
import'./App.css';
import TopPage from './TopPage';

function App() {

    return (
      <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/diagnosis" element={<Diagnosis /> } />
        </Routes>
      </Router>
  )

}

export default App
