import React from "react";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Shop from "../Pages/Shop";
import ProductDetails from "../Pages/ProductDetails";
import NotFound from "../Pages/NotFound";
import Authentication from "../Pages/Authentication";
import ResetPass from "../Components/Authentication/Reset/ResetPass";
import TermsConditions from "../Pages/TermsConditions";
import ShoppingCart from "../Components/ShoppingCart/ShoppingCart";
import Profile from "../Pages/Profile";
import EditProfile from "../Pages/EditProfilePage";
import RedeemedDealDetail from "../Components/Resuables/RedeemedDealDetailed";
import RedeemedCoupons from "../Components/Coupons/RedeemedCoupons";
import Categories from "../Components/Categories/Categories";
import Rewards from "../Pages/Rewards";

export const routes = {
  protected: [
    {
      path: "/home",
      element: React.createElement(Home),
    },
    {
      path: "/about",
      element: React.createElement(About),
    },
    {
      path: "/shop",
      element: React.createElement(Shop),
    },
    {
      path: "/product/:id",
      element: React.createElement(ProductDetails),
    },
    {
      path: "/terms",
      element: React.createElement(TermsConditions),
    },
    {
      path: "/cart",
      element: React.createElement(ShoppingCart),
    },
    {
      path: "*",
      element: React.createElement(NotFound),
    },
    {
      path: "/profile",
      element: React.createElement(Profile),
    },
    {
      path: "/profile/edit",
      element: React.createElement(EditProfile),
    },
    {
      path: "/redeemed-deals/:id",
      element: React.createElement(RedeemedDealDetail),
    },
    {
      path: "/redeemed-coupons",
      element: React.createElement(RedeemedCoupons),
    },
    {
      path: "/coupons/:categoryId",
      element: React.createElement(Categories),
    },
    {
      path: "/rewards",
      element: React.createElement(Rewards),
    },
  ],
  public: [
    {
      path: "/",
      element: React.createElement(Authentication),
    },
    {
      path: "/loginSignUp",
      element: React.createElement(Authentication),
    },
    {
      path: "/resetPassword",
      element: React.createElement(ResetPass),
    },
  ],
};
