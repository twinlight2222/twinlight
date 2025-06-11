import {Routes, Route } from "react-router-dom";
import TopPage from './TopPage';
import Diagnosis from "./pages/Diagnosis";
import Result from "./pages/Result";
import Chat24h from "./pages/24h";
import EstelleChat from "./pages/EstelleChat";
import'./App.css';


function App() {

    return (
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/diagnosis" element={<Diagnosis /> } />
          <Route path="/result"element={<Result />} />
          <Route path="/24h" element={<Chat24h />} />
          <Route path="/estelle" element={<EstelleChat />} />
        </Routes>
  )

}

export default App
