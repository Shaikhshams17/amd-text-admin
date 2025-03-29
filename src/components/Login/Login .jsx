"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { Link } from "lucide-react";
import Link from "next/link";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function UserLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  // Handle email change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!value) {
      setEmailError("Email is required.");
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }
    setFormError("");
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!value) {
      setPasswordError("Password is required.");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError("");
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!email || !password) {
      setFormError("Please fill in all required fields before proceeding.");
      return;
    }

    if (emailError || passwordError) {
      setFormError("Please correct errors before proceeding.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className={`min-h-screen flex ${interFont.variable}`}>
      {/* Left Section for Larger Screens */}
      <div className="hidden md:flex w-1/2 flex-col relative">
        <div className="h-[35%] bg-[#EDECE8] flex items-center justify-center relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Image
              src="/AMD_logo.png"
              alt="AMD Logo"
              width={190}
              height={190}
            />
          </div>
        </div>

        <div className="h-[65%] bg-[#F8F7F3] flex items-end justify-center relative">
          <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 320">
            <path
              fill="#EDECE8"
              fillOpacity="1"
              d="M1,160L120,133.3C240,107,480,53,720,53C960,53,1200,107,1320,133.3L1440,160V0H0Z"
            ></path>
          </svg>
          <Image
            src="/ArabWomanLogin.png"
            alt="Arab Woman"
            width={350}
            height={600}
            className="object-contain z-20"
          />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center relative">
        {/* Mobile Logo */}
        <div className="absolute top-6 left-5 md:hidden">
          <Image
            src="/AMD_mobile_logo.png"
            alt="Mobile Logo"
            width={60}
            height={40}
          />
        </div>

        <div className="w-full max-w-md p-8 -mt-10 md:mt-0 ">
          <h1 className="text-2xl md:text-[40px] font-bold text-center">
            Login
          </h1>
          <div className="w-[40%] h-0.5 bg-red-200 mx-auto my-3"></div>
          <p className="text-center text-black">Sign into your account</p>

          {/* Input Fields */}
          <div className="mt-8 space-y-6">
            <div className="flex flex-col items-center">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                className="w-[80%] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-gray-200"
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1 mx-10">{emailError}</p>
              )}
            </div>

            <div className="flex flex-col items-center">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="password"
                className="w-[80%] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-gray-200"
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1 mx-10">{passwordError}</p>
              )}
            </div>

            {formError && <p className="text-red-500 text-sm text-center">{formError}</p>}

            {/* Forgot Password */}
            <Link
              href="/forgetpass"
              className="text-sm text-gray-600 hover:text-black block text-center mt-2"
            >
              Forgot Password?
            </Link>
            {/* Submit Button */}
            <button
              className={`w-[40%] py-3 rounded-lg transition mx-auto block ${email && password.length >= 6
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-black text-white cursor-not-allowed"
                }`}
              onClick={handleSubmit}
              disabled={!email || password.length < 6}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLoginPage;
