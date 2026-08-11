// "use client";

// import {
//   Clock3,
//   MapPin,
//   Zap,
//   PackageCheck,
// } from "lucide-react";

// export default function ExpressDelivery() {
//   return (
//     <section
//       aria-label="Express delivery information"
//       className="w-full bg-white"
//     >
//       <div
//         className="
//           mx-auto
//           w-full
//           max-w-[1400px]
//           px-3
//           sm:px-6
//           lg:px-8
//           xl:px-0
//         "
//       >
//         <div
//           className="
//             relative
//             mt-3
//             overflow-hidden
//             rounded-xl
//             border
//             border-[#eee7f7]
//             bg-gradient-to-r
//             from-[#f2e5ff]
//             via-[#faf7fd]
//             to-[#ffffff]

//             px-5
//             py-4

//             sm:mt-5
//             sm:px-8
//             sm:py-5

//             lg:px-12
//             lg:py-4
//           "
//         >
//           {/* =================================================
//               DECORATIVE BACKGROUND
//           ================================================= */}

//           <div
//             aria-hidden="true"
//             className="
//               pointer-events-none
//               absolute
//               -right-16
//               -top-20
//               h-40
//               w-40
//               rounded-full
//               bg-purple-200/20
//               blur-3xl
//             "
//           />

//           <div
//             aria-hidden="true"
//             className="
//               pointer-events-none
//               absolute
//               -bottom-20
//               left-1/3
//               h-32
//               w-32
//               rounded-full
//               bg-purple-200/20
//               blur-3xl
//             "
//           />

//           {/* =================================================
//               CONTENT
//           ================================================= */}

//           <div
//             className="
//               relative
//               z-10
//               flex
//               min-h-[110px]
//               items-center
//               justify-between
//               gap-6

//               lg:min-h-[120px]
//             "
//           >
//             {/* =================================================
//                 LEFT CONTENT
//             ================================================= */}

//             <div
//               className="
//                 flex
//                 min-w-0
//                 flex-1
//                 items-start
//                 gap-3

//                 sm:gap-4

//                 lg:items-center
//                 lg:gap-5
//               "
//             >
//               {/* Lightning Icon */}

//               <div
//                 className="
//                   flex
//                   shrink-0
//                   items-center
//                   justify-center

//                   text-[#7c3aed]
//                 "
//               >
//                 <Zap
//                   className="
//                     h-9
//                     w-9
//                     fill-[#7c3aed]
//                     stroke-[#7c3aed]

//                     sm:h-11
//                     sm:w-11

//                     lg:h-12
//                     lg:w-12
//                   "
//                   strokeWidth={2}
//                 />
//               </div>

//               {/* Text */}

//               <div className="min-w-0">
//                 <div
//                   className="
//                     flex
//                     flex-wrap
//                     items-center
//                     gap-x-2
//                     gap-y-1
//                   "
//                 >
//                   <h2
//                     className="
//                       text-xl
//                       font-bold
//                       leading-tight
//                       tracking-tight
//                       text-[#7c3aed]

//                       sm:text-2xl

//                       md:text-3xl

//                       lg:text-[32px]
//                     "
//                   >
//                     Express Delivery in 4 hours
//                   </h2>

//                   <Clock3
//                     className="
//                       hidden
//                       h-5
//                       w-5
//                       text-[#d92d20]

//                       sm:block
//                     "
//                     strokeWidth={2.5}
//                   />
//                 </div>

//                 <p
//                   className="
//                     mt-1
//                     text-sm
//                     font-medium
//                     leading-5
//                     text-gray-900

//                     sm:text-base
//                     sm:leading-6

//                     lg:text-lg
//                   "
//                 >
//                   Order before 4 PM to receive your order
//                   in 4 hours
//                 </p>

//                 <p
//                   className="
//                     mt-0.5
//                     text-xs
//                     leading-5
//                     text-gray-500

//                     sm:text-sm
//                   "
//                 >
//                   *On select pincodes &amp; products
//                 </p>
//               </div>
//             </div>

//             {/* =================================================
//                 DELIVERY VISUAL
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 hidden
//                 h-[90px]
//                 w-[250px]
//                 shrink-0
//                 items-center
//                 justify-center

//                 sm:flex

//                 lg:h-[105px]
//                 lg:w-[310px]
//               "
//             >
//               {/* Speed lines */}

//               <div
//                 aria-hidden="true"
//                 className="
//                   absolute
//                   left-2
//                   top-1/2
//                   h-1
//                   w-12
//                   -translate-y-1/2
//                   rounded-full
//                   bg-[#d9342b]
//                   opacity-80
//                 "
//               />

//               <div
//                 aria-hidden="true"
//                 className="
//                   absolute
//                   left-0
//                   top-[35%]
//                   h-1
//                   w-8
//                   rounded-full
//                   bg-[#d9342b]
//                   opacity-70
//                 "
//               />

//               {/* Package */}

//               <div
//                 className="
//                   absolute
//                   bottom-2
//                   right-2
//                   flex
//                   h-8
//                   w-10
//                   items-center
//                   justify-center
//                   rounded-md
//                   border-2
//                   border-[#d9342b]
//                   bg-[#f5a623]

//                   lg:right-5
//                 "
//               >
//                 <PackageCheck
//                   className="
//                     h-5
//                     w-5
//                     text-white
//                   "
//                   strokeWidth={2}
//                 />
//               </div>

//               {/* Truck */}

//               <div
//                 className="
//                   absolute
//                   bottom-4
//                   left-1/2
//                   flex
//                   -translate-x-1/2
//                   items-end
//                 "
//               >
//                 {/* Truck Body */}

//                 <div
//                   className="
//                     relative
//                     h-[42px]
//                     w-[120px]
//                     rounded-md
//                     rounded-br-none
//                     bg-[#d9342b]
//                     shadow-md

//                     lg:h-[48px]
//                     lg:w-[145px]
//                   "
//                 >
//                   {/* Window */}

//                   <div
//                     className="
//                       absolute
//                       right-2
//                       top-2
//                       h-[20px]
//                       w-[30px]
//                       rounded-sm
//                       bg-[#f8d7d4]

//                       lg:h-[23px]
//                       lg:w-[35px]
//                     "
//                   />

//                   {/* Delivery Label */}

//                   <span
//                     className="
//                       absolute
//                       left-3
//                       top-3
//                       text-[7px]
//                       font-bold
//                       uppercase
//                       tracking-wide
//                       text-white

//                       lg:text-[8px]
//                     "
//                   >
//                     Delivery
//                   </span>

//                   {/* Front */}

//                   <div
//                     className="
//                       absolute
//                       -right-7
//                       bottom-0
//                       h-[32px]
//                       w-[32px]
//                       rounded-r-lg
//                       bg-[#d9342b]

//                       lg:-right-8
//                       lg:h-[36px]
//                       lg:w-[36px]
//                     "
//                   />

//                   {/* Wheel 1 */}

//                   <div
//                     className="
//                       absolute
//                       -bottom-3
//                       left-4
//                       h-7
//                       w-7
//                       rounded-full
//                       border-4
//                       border-gray-700
//                       bg-gray-900
//                     "
//                   />

//                   {/* Wheel 2 */}

//                   <div
//                     className="
//                       absolute
//                       -bottom-3
//                       right-1
//                       h-7
//                       w-7
//                       rounded-full
//                       border-4
//                       border-gray-700
//                       bg-gray-900
//                     "
//                   />
//                 </div>
//               </div>

//               {/* Clock */}

//               <div
//                 className="
//                   absolute
//                   -right-1
//                   -top-1
//                   flex
//                   h-12
//                   w-12
//                   items-center
//                   justify-center
//                   rounded-full
//                   border-4
//                   border-[#d9342b]
//                   bg-white
//                   shadow-md

//                   lg:right-2
//                   lg:h-14
//                   lg:w-14
//                 "
//               >
//                 <Clock3
//                   className="
//                     h-6
//                     w-6
//                     text-[#d9342b]

//                     lg:h-7
//                     lg:w-7
//                   "
//                   strokeWidth={2.5}
//                 />
//               </div>

//               {/* Location Pin */}

//               <div
//                 className="
//                   absolute
//                   bottom-5
//                   right-14
//                   flex
//                   h-7
//                   w-7
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-[#d9342b]

//                   lg:right-20
//                   lg:h-8
//                   lg:w-8
//                 "
//               >
//                 <MapPin
//                   className="
//                     h-4
//                     w-4
//                     fill-white
//                     text-white
//                   "
//                 />
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               MOBILE DELIVERY ICON
//           ================================================= */}

//           <div
//             className="
//               relative
//               z-10
//               mt-0
//               flex
//               items-center
//               gap-3
//               sm:hidden
//             "
//           >
//             <div
//               className="
//                 flex
//                 h-9
//                 w-9
//                 items-center
//                 justify-center
//                 rounded-full
//                 bg-[#d9342b]
//                 text-white
//               "
//             >
//               <Clock3
//                 className="h-5 w-5"
//                 strokeWidth={2.5}
//               />
//             </div>

//             <div
//               className="
//                 flex
//                 items-center
//                 gap-2
//                 text-xs
//                 font-medium
//                 text-gray-600
//               "
//             >
//               <MapPin className="h-4 w-4 text-[#d9342b]" />
//               Fast delivery available on select
//               locations
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }