import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiagnosaPage from './components/DiagnosaPage';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diagnosa" element={<DiagnosaPage />} />
      </Routes>
    </Router>
  );
};

export default App;
