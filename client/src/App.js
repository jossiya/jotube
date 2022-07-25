import './App.css';
import React,{Suspense} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import NavBar from './components/veiws/NavBar/NavBar';
import LandingPage from './components/veiws/LandingPage/LandingPage';
import LoginPage from './components/veiws/LoginPage/LoginPage';
import RegisterPage from './components/veiws/RegisterPage/RegisterPage';
import VideoUploadPage from './components/veiws/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './components/veiws/VideoDetailPage/VideoDetailPage'
import SubscriptionPage from './components/veiws/SupscriptionPage/SupscriptionPage'
import MyChannel from './components/veiws/MyChannel/MyChannel'
// import ProfilePage from './components/veiws/Profile/ProfilePage'
import User from './components/veiws/User/User';
function App() {
  console.log('render?')
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
    <Router>
    <NavBar/>
      <div>
      
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/register" element={<RegisterPage/>} />
          <Route exact path="/video/upload" element={<VideoUploadPage/>} />
          <Route exact path="/video/:videoid" element={<VideoDetailPage/>} />
          <Route exact path="/Subscription" element={<SubscriptionPage/>} />
          <Route exact path="/MyChannel/:uid" element={<MyChannel/>} />
          {/* <Route exact path="/Profile/:uid" element={<ProfilePage/>} /> */}
          <Route exact path="/User/:uid" element={<User/>} />
        </Routes>
      </div>
    </Router>
    </Suspense>
  );
}



export default App;
