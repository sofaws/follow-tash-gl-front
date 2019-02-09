import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import PublicDashboard from "views/PublicDashboard/PublicDashboard.jsx";

const indexRoutes = [
  { path: "/public", component: PublicDashboard },
  { path: "/", component: Dashboard }
];

export default indexRoutes;
