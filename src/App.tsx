import { Routes, Route } from 'react-router-dom'; // React Router のインポートを追加
import'./App.css';
import TopPage from './TopPage';

function App() {

    return (
        <Routes>
          <Route path="/" element={<TopPage />} />
        </Routes>
  )

}

export default App
