import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiagnosaPage from './components/DiagnosaPage';
import HomePage from './components/HomePage';
import ResultDiagnosaPage from './components/HasilDiagnosaPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diagnosa" element={<DiagnosaPage />} />
        <Route path="/result-diagnosa" element={<ResultDiagnosaPage />} />
      </Routes>
    </Router>
  );
};

export default App;
