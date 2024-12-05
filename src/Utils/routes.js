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
export const routes = {
    protected: [
        {
            path: "/home",
            element: React.createElement(Home)
        },
        {
            path: "/about",
            element: React.createElement(About)
        },
        {
            path: "/shop",
            element: React.createElement(Shop)
        },
        {
            path: "/product",
            element: React.createElement(ProductDetails)
        },
        {
            path: "/terms",
            element: React.createElement(TermsConditions)
        },
        {
            path: "/cart",
            element: React.createElement(ShoppingCart)
        },
        {
            path: "*",
            element: React.createElement(NotFound)
        },
        {
            path: "/profile",
            element: React.createElement(Profile)
        }
    ],
    public: [
        {
            path: "/",
            element: React.createElement(Authentication)
        },
        {
            path: "/loginSignUp",
            element: React.createElement(Authentication)
        },
        {
            path: "/resetPassword",
            element: React.createElement(ResetPass)
        }
    ]
};
