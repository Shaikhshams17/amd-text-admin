const Footer = () => {
  return (
    <footer className="sticky bottom-0 left-0 w-full bg-gray-200 text-gray-700 text-sm py-4 px-6 flex flex-row h-24 justify-between items-center border-t rounded-t-2xl ">
      {/* Left Section */}
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <p>Copyright © 2025 AMD. All rights reserved.</p>
        <div className="flex items-center space-x-2">
          <a
            href="/terms-of-use"
            className="text-blue-600 hover:underline"
          >
            Terms of Use
          </a>
          <span className="text-gray-400">|</span>
          <a
            href="/privacy-policy"
            className="text-blue-600 hover:underline"
          >
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="text-gray-700 mt-2 md:mt-0">
        <p>Seek insights that are valuable to you</p>
      </div>
    </footer>
  );
};

export default Footer;
