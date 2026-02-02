import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="
        flex bottom-0 left-0 right-0
        w-full
        bg-gradient-to-r from-slate-900 via-slate-800 to-black
        hover:from-green-800 hover:via-slate-800 hover:to-slate-900
        text-slate-300 py-6 border-t border-slate-700
        transition-all duration-700 ease-in-out
        z-50
      "
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Section */}
        <div className="text-center md:text-left">
         <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="BrainSpark Logo"
              className="w-21 h-17 object-contain"
            />
        </Link>
          <p className="text-sm mt-2 text-slate-400">
            Challenge your mind. Learn. Grow. Have fun with knowledge.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-5 text-xl">
          <a
            href="https://www.facebook.com/englishconversationinsitamarhi"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://x.com/Amit_Raj_Stm"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/amitraj_stm"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/amitkumarraj-stm/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/amitrajstm"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700 mt-8 pt-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} BrainSpark. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
