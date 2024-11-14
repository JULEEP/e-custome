import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage';
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
import Cart from './Pages/Cart/Cart';
import SingleCategory from './SingleCategory/SingleCategory';
import MobileNavigation from './Navigation/MobileNavigation';
import DesktopNavigation from './Navigation/DesktopNavigation';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPasswordForm from './Auth/ForgotPassword/ForgotPasswordForm';
import AddNewPassword from './Auth/ForgotPassword/AddNewPassword';
import AdminLogin from './Admin/Auth/Login/AdminLogin';
import AdminRegister from './Admin/Auth/Register/AdminRegister';
import VerifyEmail from './Auth/EmailVerify/EmailVerify';
import AboutUs from './Pages/AboutUs/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs';





function App() {
  return (
    <>
      <ToastContainer toastClassName='toastContainerBox' transition={Flip} position='top-center' />
      <Router>
        <DesktopNavigation />
        <div className='margin'>
          <Routes>
            {/*User Routes  */}
            <Route path='/' index element={<HomePage />} />
            <Route path="/login" element={< Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='product/type/:cat' element={<SingleCategory />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/forgotpassword' element={<ForgotPasswordForm />} />
            <Route path='/user/reset/:id/:token' element={<AddNewPassword />} />
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path='/contactUs' element={<ContactUs />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={< AdminLogin />} />
            <Route path='/admin/register' element={<AdminRegister />} />
          </Routes>
        </div>
        <MobileNavigation />
      </Router >


    </>
  );
}
export default App;
