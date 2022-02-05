import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Chats from './components/Chats';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import UpdateProfile from './components/UpdateProfile';
import LoadingScreen from './components/LoadingScreen';
import ModalMatch from './components/ModalMatch';

function App() {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const state = location.state;

  //todo:
  //1-use the error to send back to login page an display the error

  // let state = location.state as { backgroundLocation?: Location };

  if (loading) {
    return <LoadingScreen />;
  } else if (!user) {
    return <Login />;
  } else {
    return (
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='updateprofile' element={<UpdateProfile />} />
          <Route path='chats' elemennt={<Chats />} />
        </Routes>

        {state?.backgroundLocation && (
          <Routes>
            <Route path='/' element={<ModalMatch />} />
          </Routes>
        )}
      </>
    );
  }
}

export default App;
