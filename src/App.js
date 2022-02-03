import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Chats from './components/Chats';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import UpdateProfile from './components/UpdateProfile';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [user, loading] = useAuthState(auth);

  //todo:
  //1-use the error to send back to login page an display the error
  //2-update Routes to have updateProfile Route

  if (loading) {
    return <LoadingScreen />;
  } else if (!user) {
    return <Login />;
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/updateprofile' element={<UpdateProfile />} />
          <Route path='/chats' elemennt={<Chats />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
