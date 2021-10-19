
import './App.css';
import React, { useState ,useEffect}from 'react'
import Products from './components/products/Products';
import Navbar from './components/Navbar/Navbar';
import { commerce } from './libarary/commerce';
import Product from './components/products/product/Product';
import { Cart } from './components/Cart/Cart';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Cheackout from './components/CheackoutForm/Cheackout/Cheackout';
const App = () => {

  const [products,setProducts]=useState([])
  const [cart, setCart] = useState({})

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart=async ()=>{
    setCart(await commerce.cart.retrieve());
  }

const handelAddToCart= async (ProductId,quantity)=>{

    const {cart}=await commerce.cart.add(ProductId,quantity);
    setCart(cart)
}
const handelUpdateCartQ= async (ProductId,quantity)=>{
    const{cart}=await commerce.cart.update(ProductId,{quantity})
    setCart(cart)
}
const handelRemoveCart= async (ProductId)=>{
  const{cart}=await commerce.cart.remove(ProductId)
  setCart(cart);
}
const handelEmptyCart=async()=>{
  const {cart}=await commerce.cart.empty()
  setCart(cart)
}

  useEffect(() => {
      fetchProducts();
      fetchCart();
    
    }, [])
 
  return (
      <Router>
        <div>
          <Navbar totalItems={cart.total_items}/>
          <Switch>
             <Route exact path='/' > 
               <Products products={products} onAddToCart={handelAddToCart}/>
               </Route>
             <Route exact path="/cart">
                <Cart 
                cart={cart}
                handelUpdateCartQ={handelUpdateCartQ}
                handelRemoveCart={handelRemoveCart}
                handelEmptyCart={handelEmptyCart}
                />
            </Route>
            <Route exact path="/cheackout">
              <Cheackout cart={cart}/>
            </Route>
          
         </Switch> 
        </div>
      </Router> 
 )}

export default App;
