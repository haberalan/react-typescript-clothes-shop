import { Routes, Route, Navigate } from 'react-router';
import { useEffect } from 'react';

import { UserType } from '../types/User';
import { useAppSelector, useAppDispatch } from '../common/hooks/useRedux';
import { setCart } from '../features/cart/cartSlice';
import { setUser } from '../features/user/userSlice';
import { GlobalStyle } from './GlobalStyles';
import { ScrollToTop } from '../common/utils/ScrollToTop';
import { Layout } from '../common/components/Layout/Layout';

import { Home } from '../pages/Home.page';
import { Men } from '../pages/Men.page';
import { Women } from '../pages/Women.page';
import { Kids } from '../pages/Kids.page';
import { Category } from '../pages/Category.page';
import { Item } from '../pages/Item.page';
import { Signup } from '../pages/Signup.page';
import { Login } from '../pages/Login.page';
import { Checkout } from '../pages/Checkout.page';
import { Profile } from '../pages/Profile.page';
import { MakePurchase } from '../pages/MakePurchase.page';
import { Purchase } from '../pages/Purchase.page';
import { NotFound } from '../pages/NotFound.page';

export const App = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('CLOTHES-SHOP_cart') as string);

    if (cartItems) {
      dispatch(setCart(cartItems));
    }

    const token = JSON.parse(localStorage.getItem('CLOTHES-SHOP_token') as string);

    if (token) {
      const userData = JSON.parse(localStorage.getItem('CLOTHES-SHOP_user') as string) as UserType;

      dispatch(setUser({ token, user: userData }));
    }
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="men">
            <Route index element={<Men />} />
            <Route path=":category" element={<Category forWho="men" />} />
            <Route path="item/:id" element={<Item />} />
          </Route>
          <Route path="women">
            <Route index element={<Women />} />
            <Route path=":category" element={<Category forWho="women" />} />
            <Route path="item/:id" element={<Item />} />
          </Route>
          <Route path="kids">
            <Route index element={<Kids />} />
            <Route path=":category" element={<Category forWho="Kids" />} />
            <Route path="item/:id" element={<Item />} />
          </Route>
          <Route path="checkout">
            <Route index element={<Checkout />} />
            <Route path="details" element={user.user ? <MakePurchase /> : <Navigate to="/checkout" />} />
          </Route>
          <Route path="signup" element={!user.user ? <Signup /> : <Navigate to="/profile" />} />
          <Route path="login" element={!user.user ? <Login /> : <Navigate to="/profile" />} />
          <Route path="profile">
            <Route index element={user.user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="purchase/:id" element={user.user ? <Purchase /> : <Navigate to="/login" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};
