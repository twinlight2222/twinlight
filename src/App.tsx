import { BrowserRouter,Routes,Route } from 'react-router-dom';
import'./App.css';
import { useState } from 'react'
import TopPage from './TopPage';

function App() {
  const [selected, setSelected] = useState<string | null>(null);

    return (
        <Routes>
          <Route path="/" element={<TopPage />} />
        </Routes>
  )

}

export default App
