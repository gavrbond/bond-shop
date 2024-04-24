import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import AuthProvider from "./AuthContext"
import SignUp from "./pages/SignUp/SignUp.jsx"
import SignIn from "./pages/SignIn/SignIn.jsx"
import MainPage from "./pages/MainPage.jsx"
import Card from "./pages/Card/Card.jsx"
import Category from "./pages/Category/Category.jsx"
import Cart from "./pages/Cart/Cart.jsx"
import SearchContext from "./SearchContext.jsx"
import Order from "./pages/Orders/Order.jsx"
import { RecoilRoot } from "recoil"
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SearchContext>
          <RecoilRoot>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path='/card/:id' element={<Card />} />
                <Route path='/category/:category' element={<Category />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/orders' element={<Order />} />
              </Route>
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
            </Routes>
          </RecoilRoot>
        </SearchContext>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
