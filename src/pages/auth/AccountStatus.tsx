// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import { selectCurrentUser } from "@/redux/slices/authSlice";

// const AccountStatus = () => {
//   const user = useSelector(selectCurrentUser);
//   const navigate = useNavigate();

//   if (!user) {
//     navigate("/login");
//     return null;
//   }

//   const isBlocked = user.status === "blocked";
//   const isSuspended = user.status === "suspended";

//   const getMessage = () => {
//     if (isBlocked)
//       return "Your account has been permanently blocked due to policy violations.";
//     if (isSuspended)
//       return "Your account is temporarily suspended. Please contact support to resolve the issue.";
//     return "Unknown account status.";
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
//       <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-red-200">
//         <h1 className="text-3xl font-bold text-red-600 mb-3">
//           {isBlocked ? "Account Blocked" : "Account Suspended"}
//         </h1>

//         <p className="text-gray-600 mb-5">{getMessage()}</p>

//         <div className="bg-red-100 text-red-700 py-2 px-4 rounded-lg mb-6 text-sm font-medium">
//           You cannot access your dashboard until this issue is resolved.
//         </div>

//         <div className="text-sm text-gray-500">
//           For assistance, contact our support team:
//           <br />
//           <a
//             href="mailto:support@rideapp.com"
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             support@rideapp.com
//           </a>
//           <br />
//           or call <span className="font-semibold">+8801XXXXXXXXX</span>
//         </div>

//         <button
//           onClick={() => navigate("/")}
//           className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
//         >
//           Go to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AccountStatus;
