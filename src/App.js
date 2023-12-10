import logo from './logo.svg';
import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Members from './components/Members';
import Login from './components/Login';
import Wrapclass from './components/Wrapclass';
import AddMember from './components/AddMember';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/members" element={<Members/>}/>
        <Route path="/modifyMember" element={<Wrapclass></Wrapclass>}/>
        <Route path="/addMember" element={<AddMember></AddMember>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
