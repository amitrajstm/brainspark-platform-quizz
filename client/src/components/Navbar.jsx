import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-3">
      {/* Logo + Brand */}
      <Link to="/" className="flex items-center gap-3">
  <img
    src="/logo.png"
    alt="BrainSpark Logo"
    className="w-25 h-25 object-contain"
  />
</Link>


      {/* Menu */}
      <div className="flex gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-600" : "text-white"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-green-600" : "text-white"
          }
        >
          Dashboard
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;



// import React from "react";
// import { Link, NavLink } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="flex items-center justify-between py-3">
//       <Link
//         to={"/"}
//         className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent font-mono hover:from-green-300 hover:to-green-500 transition-all duration-300"
//       >
//         BrainSpark
//       </Link>
//       <div className="flex gap-5">
//         <NavLink
//           to={"/"}
//           className={({ isActive }) =>
//             isActive === true ? "text-green-600" : "text-white"
//           }
//         >
//           Home
//         </NavLink>
//         <NavLink
//           to={"/dashboard"}
//           className={({ isActive }) =>
//             isActive === true ? "text-green-600" : "text-white"
//           }
//         >
//           Dashboard
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
