import { Background } from '../components/Background';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login, SignUp, Home } from '../pages'


function App() {
  return (
    <Background>
      <Router>
            {/* //! I'm guessing this acts like a switch-case and serves the component according to the path */ }
            {/* //* cf https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom  */}
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/" element={<Home/>} />
            </Routes>
        </Router>

    </Background>
  );
}

export default App;
