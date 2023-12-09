import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import AuthProvider from "./AuthContext"
import SignUp from "./pages/SignUp/SignUp.jsx"
import SignIn from "./pages/SignIn/SignIn.jsx"
import MainPage from "./pages/MainPage.jsx"
import Card from "./pages/Card/Card.jsx"
import Category from "./pages/Category/Category.jsx"
import Basket from "./pages/Basket/Basket.jsx"
import Favorites from "./pages/Favorites/Favorites.jsx"
import DataContext from "./DataContext.jsx"
import SearchContext from "./SearchContext.jsx"
import Order from "./pages/Orders/Order.jsx"
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <DataContext>
          <SearchContext>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path='/card/:id' element={<Card />} />
                <Route path='/category/:category' element={<Category />} />
                <Route path='/basket' element={<Basket />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/orders' element={<Order />} />
              </Route>
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
            </Routes>
          </SearchContext>
        </DataContext>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
