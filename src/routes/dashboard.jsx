// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import UsersList from "views/UsersList/UsersList.jsx";
import TasksList from "views/TasksList/TasksList.jsx";
import TaskDetails from "views/TaskDetails/TaskDetails.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user/:id",
    notNavbar: true,
    navbarName: "Membre",
    component: UserProfile
  },
  {
    path: "/users",
    sidebarName: "Les membres",
    navbarName: "Profile",
    icon: Person,
    component: UsersList
  },
  {
    path: "/tasks",
    sidebarName: "Liste des tâches",
    navbarName: "Liste des tâches",
    icon: "content_paste",
    component: TasksList
  },
  {
    path: "/task/:id",
    notNavbar: true,
    icon: "content_paste",
    component: TaskDetails
  },

  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
