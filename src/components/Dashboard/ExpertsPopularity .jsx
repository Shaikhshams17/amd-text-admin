
// "use client";

// // import { TrendingUp } from "lucide-react";
// // import { Pie, PieChart } from "recharts";

// // Shacn UI components
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import {
// //   ChartConfig,
// //   ChartContainer,
// //   ChartTooltip,
// //   ChartTooltipContent,
// // } from "@/components/ui/chart";

// // Example Pie Chart Data (domains + values + fill colors)
// const chartData = [
//   { domain: "Career & Business", value: 50, fill: "#8E00B6" },
//   { domain: "Home", value: 25, fill: "#5858FA" },
//   { domain: "Wellness", value: 20, fill: "#FF4016" },
//   { domain: "Others", value: 5, fill: "#737373" },
// ];

// // Chart config for Shacn UI
// const chartConfig = {
//   value: { label: "Value" },
//   domain: { label: "Domain" },
// } 

// // Table data with domain, percentage, new users, total users
// const domainStats = [
//   {
//     domain: "Career & Business",
//     percent: "50%",
//     newUsers: "778",
//     totalUsers: "3774",
//     color: "#8E00B6",
//   },
//   {
//     domain: "Home",
//     percent: "25%",
//     newUsers: "378",
//     totalUsers: "2774",
//     color: "#5858FA",
//   },
//   {
//     domain: "Wellness",
//     percent: "20%",
//     newUsers: "86",
//     totalUsers: "726",
//     color: "#FF4016",
//   },
//   {
//     domain: "Others",
//     percent: "5%",
//     newUsers: "12",
//     totalUsers: "125",
//     color: "#737373",
//   },
// ];

// const ExpertsPopularity = () => {
//   return (
//     <div className="flex flex-col md:flex-row gap-6">
//       {/* LEFT SIDE: Pie Chart */}
//       <Card className="md:w-1/2 w-full flex flex-col">
//         <CardHeader className="pb-0">
//           <CardTitle>Domain-wise Experts Popularity among Users</CardTitle>
//           <CardDescription>Pie Chart Representation</CardDescription>
//         </CardHeader>
//         <CardContent className="flex-1 pb-0">
//           <ChartContainer
//             config={chartConfig}
//             className="mx-auto aspect-square max-h-[250px] px-0"
//           >
//             <PieChart>
//               <ChartTooltip
//                 content={<ChartTooltipContent nameKey="value" hideLabel />}
//               />
//               <Pie
//                 data={chartData}
//                 dataKey="value"
//                 nameKey="domain"
//                 labelLine={false}
//                 label={({ payload, ...props }) => (
//                   <text
//                     cx={props.cx}
//                     cy={props.cy}
//                     x={props.x}
//                     y={props.y}
//                     textAnchor={props.textAnchor}
//                     dominantBaseline={props.dominantBaseline}
//                     fill="hsla(var(--foreground))"
//                   >
//                     {payload.value}%
//                   </text>
//                 )}
//               />
//             </PieChart>
//           </ChartContainer>
//         </CardContent>
//         {/* Legend Below Chart */}
//         <CardFooter className="flex flex-wrap gap-3 text-sm">
//           {chartData.map((item) => (
//             <div key={item.domain} className="flex items-center space-x-2">
//               <span
//                 className="inline-block h-3 w-3 rounded-full"
//                 style={{ backgroundColor: item.fill }}
//               />
//               <span>{item.domain}</span>
//             </div>
//           ))}
//         </CardFooter>
//       </Card>

//       {/* RIGHT SIDE: Table of Stats */}
//       <Card className="md:w-1/2 w-full">
//         <CardHeader>
//           <CardTitle>Domain Statistics</CardTitle>
//           <CardDescription>Matches Pie Chart Data</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {domainStats.map((item) => (
//               <div
//                 key={item.domain}
//                 className="flex items-center justify-between"
//               >
//                 {/* Left: Domain + color-coded % */}
//                 <div className="flex flex-col items-start">
//                   <div className="flex items-center space-x-2">
//                     <span
//                       className="inline-block h-3 w-3 rounded-full"
//                       style={{ backgroundColor: item.color }}
//                     />
//                     <span className="font-medium">{item.domain}</span>
//                   </div>
//                   <span
//                     className="text-sm font-semibold"
//                     style={{ color: item.color }}
//                   >
//                     {item.percent}
//                   </span>
//                 </div>

//                 {/* Middle: New Users */}
//                 <div className="text-center">
//                   <span className="text-sm text-muted-foreground">
//                     {item.newUsers} New users
//                   </span>
//                 </div>

//                 {/* Right: Total Users */}
//                 <div className="text-right">
//                   <span className="text-sm text-muted-foreground">
//                     Total {item.totalUsers} users
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ExpertsPopularity;
