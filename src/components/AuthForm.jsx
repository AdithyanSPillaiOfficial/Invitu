"use client";
import { useLoading } from '@/contexts/LoadingContext';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AuthForm = () => {
  const router = useRouter();
  const sessionId = Cookies.get('sessionid');
  const user = Cookies.get('user')
  useEffect(() => {
    if(sessionId && user) {
      toast.info("You have already Logged in");
      router.replace('/dashboard');
    }    
    
  }, [])
  
  const {setLoading} = useLoading();
  const [showLogin, setShowLogin] = useState(true);
  const [loginDetails, setLoginDetails] = useState({
    email : '',
    password : '',
    rememberme : false
  });
  const [signupDetails, setSignupDetails] = useState({
    name : '',
    username : '',
    email : '',
    password : '',
    confirmpassword : ''
  });

  const searchParams = useSearchParams();
  useEffect(() => {
    if(searchParams.get("signup")){
      setShowLogin(false);
    }    
    
  }, [])

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  async function loginHandler(e) {
    e.preventDefault()
    console.log(loginDetails)

    setLoading(true)
    const result = await fetch('/api/auth/login', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(loginDetails)
    });

    if(result.ok) {
      const res = await result.json();
      if(res.success) {
        console.log("Login Sucess", res)
        Cookies.set("sessionid", res.sessionid, {expires : 1});
        Cookies.set("user", JSON.stringify(res.user));
        toast.success("Login Sucessfull")
        router.replace('/dashboard');
      }
      else {
        if(res.rescode === 310) {
          toast.error("Invalid Credentials");
        } else {
          toast.error("Something went wrong");
        }
      }
    } else {
      toast.error("Something Went Wrong");
    }
    setLoading(false)
  }

  async function handleSignup(e) {
    e.preventDefault();
    console.log(signupDetails);
    if(signupDetails.password.trim() !== signupDetails.confirmpassword.trim()) {
        toast.error("Password and Confirm password should be same")
        return
    }
    setLoading(true);
    
    const result = await fetch('/api/auth/signup', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({...signupDetails, confirmpassword : null})
    });
    if(result.ok) {
      const res = await result.json();
      if(res.sucess) {
        toast.success("User Registered Sucessfully");
        setShowLogin(true);
      }
      else {
        toast.error("Failed to register user");
      }
    }
    else {
      toast.error("Failed to register user")
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex justify-center items-center font-['Inter'] overflow-hidden relative text-gray-800">
      {/* Subtle blurred circles */}
      <div className="absolute w-[200px] h-[200px] top-[10%] left-[5%] bg-white opacity-10 rounded-full blur-[50px] z-0"></div>
      <div className="absolute w-[300px] h-[300px] bottom-[15%] right-[10%] bg-white opacity-10 rounded-full blur-[50px] z-0"></div>

      {/* Form Container */}
      <div className={`form-container z-10 bg-white p-8 md:p-10 lg:p-12 rounded-xl shadow-2xl w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 max-w-md transition-all duration-500 ease-in-out transform ${showLogin ? 'opacity-100 scale-100' : 'opacity-100 scale-100'}`}>
        {showLogin ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-center text-teal-700 mb-6">Welcome Back, Love!</h2>
            <p className="text-center text-gray-600 mb-8">Sign in to continue your journey with us.</p>

            <form className="space-y-5" onSubmit={loginHandler}>
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  placeholder="your.love@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out outline-teal-600"
                  required
                  value={loginDetails.email}
                  onChange={(e) => setLoginDetails(loginDetails => ({...loginDetails, email : e.target.value}))}
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-teal-600 focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                  required
                  value={loginDetails.password}
                  onChange={(e) => setLoginDetails(loginDetails => ({...loginDetails, password : e.target.value}))}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-600 outline-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    onChange={(e) => setLoginDetails(loginDetails => ({...loginDetails, rememberme : e.target.checked}))}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-gray-700">Remember me</label>
                </div>
                <a href="#" className="font-medium text-teal-600 hover:text-teal-800 transition duration-200 ease-in-out">
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              New to Love's Embrace?{' '}
              <button
                onClick={handleToggle}
                className="font-medium text-teal-600 hover:text-teal-800 transition duration-200 ease-in-out"
              >
                Create an account
              </button>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-center text-teal-700 mb-6">Join Our Love Story!</h2>
            <p className="text-center text-gray-600 mb-8">Sign up to begin your beautiful journey.</p>

            <form className="space-y-5" onSubmit={handleSignup}>
            <div>
                <label htmlFor="signup-username" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="signup-name"
                  name="name"
                  placeholder="Your Romantic Name"
                  className="w-full px-4 py-2 border outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                  required
                  value={signupDetails.name}
                  onChange={(e) => setSignupDetails(signupDetails => ({...signupDetails, name : e.target.value}))}
                />
              </div>
              <div>
                <label htmlFor="signup-username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  id="signup-username"
                  name="username"
                  placeholder="Your lovely Username"
                  className="w-full px-4 py-2 border outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                  required
                  value={signupDetails.username}
                  onChange={(e) => setSignupDetails(signupDetails => ({...signupDetails, username : e.target.value}))}
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  placeholder="your.love@example.com"
                  className="w-full px-4 py-2 border outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                  required
                  value={signupDetails.email}
                  onChange={(e) => setSignupDetails(signupDetails => ({...signupDetails, email : e.target.value}))}
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                  required
                  value={signupDetails.password}
                  onChange={(e) => setSignupDetails(signupDetails => ({...signupDetails, password : e.target.value}))}
                />
              </div>
              <div>
                <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  id="signup-confirm-password"
                  name="confirm-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                  required
                  value={signupDetails.confirmpassword}
                  onChange={(e) => setSignupDetails(signupDetails => ({...signupDetails, confirmpassword : e.target.value}))}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <button
                onClick={handleToggle}
                className="font-medium text-teal-600 hover:text-teal-800 transition duration-200 ease-in-out"
              >
                Login here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
