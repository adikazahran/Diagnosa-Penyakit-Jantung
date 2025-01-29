import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiagnosaPage from './components/DiagnosaPage';
import HomePage from './components/HomePage';
import ResultDiagnosaPage from './components/HasilDiagnosaPage';
import TipsPage from './components/TipsPage';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diagnosa" element={<DiagnosaPage />} />
        <Route path="/result-diagnosa" element={<ResultDiagnosaPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
