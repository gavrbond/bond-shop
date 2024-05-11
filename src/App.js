import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil"
import AuthProvider from "./AuthContext"
import SearchContext from "./SearchContext.jsx"
import Layout from "./components/Layout/Layout"
import Card from "./pages/Card/Card.jsx"
import Cart from "./pages/Cart/Cart.jsx"
import Category from "./pages/Category/Category.jsx"
import MainPage from "./pages/MainPage.jsx"
import Order from "./pages/Orders/Order.jsx"
import SignIn from "./pages/SignIn/SignIn.jsx"
import SignUp from "./pages/SignUp/SignUp.jsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
