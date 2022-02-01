import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Chats from './components/Chats';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import AddPhoto from './components/AddPhoto';

function App() {
  const [user, loading, error] = useAuthState(auth);
  //use the error to send back to login page an display the error

  if (!user) {
    return <Login />;
  } else if (user.photoURL === null) {
    return <AddPhoto />;
  } else {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chats' elemennt={<Chats />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
