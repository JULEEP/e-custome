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
import WishList from './Pages/WishList/WishList';
import CreateProduct from './Admin/Auth/Components/CreateProduct/CreateProduct';
import ProductsTable from './Admin/Auth/Components/ProductTable/ProductsTable';
import Sidebar from './Components/SideBar/SideBar';
import Dashboard from './Components/Dashboard/Dashboard';
import Order from './Pages/Orders/Order';
import Address from './Pages/Address/Address';
import SingleProduct from './Pages/SingleProduct/SingleProduct';
import CanvasComponent from './Components/CanvasComponent'
import CreateOrder from './Pages/Orders/CreateOrder/CreateOrder';
import GetOrders from './Pages/Orders/GetOrder/GetOrders';
import Checkout from './Pages/CheckOut/Checkout';
import OrderStatusStepper from './Pages/OrderStepper/OrderStatusStepper';
import UserDetails from './Pages/UserDetails/UserDetails';
import ShippingAddress from './Pages/ShippingAddress/ShippingAddress';
import TermsOfService from './Pages/Term&Condition/TermAndCondition';
import PrivacyPolicy from './Pages/PrivacyPage/Privecy';
import CategoryPage from './Helpers/CategoryPage';
import CategoryDetailsPage from './Helpers/SubCategoriesPage';
import AllProducts from './Pages/AllProdutcs/AllProducts';



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
            <Route path="/cart/:userId" element={<Cart />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path='/wishlist/:userId' element={<WishList />} />
            <Route path='/forgotpassword' element={<ForgotPasswordForm />} />
            <Route path='/user/reset/:id/:token' element={<AddNewPassword />} />
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path='/contactUs' element={<ContactUs />} />
            <Route path='/dashb' element={<Sidebar />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/orders/:userId" element={<GetOrders />} />
            <Route path='/user-orders' element={<Order />} />
            <Route path='/address' element={<Address />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/canvas/:id" element={<CanvasComponent />} />
            <Route path="/checkout/:userId" element={<Checkout />} />
            <Route path='/orderStepper' element={<OrderStatusStepper />} />
            <Route path="/userDetails/:userId" element={<UserDetails />} />
            <Route path="/shipping-address/:userId" element={<ShippingAddress />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privecyPolicy" element={<PrivacyPolicy />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/category/:slug" element={<CategoryDetailsPage />} />
            <Route path="/allproducts" element={<AllProducts />} />





            






            {/* Admin Routes */}
            <Route path="/admin/login" element={< AdminLogin />} />
            <Route path='/admin/register' element={<AdminRegister />} />
            <Route path='/admin/create-product' element={<CreateProduct />} />
            <Route path='/admin/all-products' element={<ProductsTable />} />
          </Routes>
        </div>
        <MobileNavigation />
      </Router >


    </>
  );
}
export default App;
