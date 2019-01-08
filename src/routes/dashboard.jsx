import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import EventSeat from "@material-ui/icons/EventSeat";
import ViewAgenda from "@material-ui/icons/ViewAgenda";

import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import UsersList from "views/UsersList/UsersList.jsx";
import TasksList from "views/TasksList/TasksList.jsx";
import TaskDetails from "views/TaskDetails/TaskDetails.jsx";
import LotsList from "views/LotsList/LotsList.jsx";

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
        navbarName: "Liste des membres",
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
    {
        path: "/lots",
        icon: ViewAgenda,
        component: LotsList,
        sidebarName: "Les lôts",
        navbarName: "Les lôts"
    },
    {
        path: "/ilots",
        icon: EventSeat,
        component: TaskDetails,
        sidebarName: "Les ilots",
        navbarName: "Les ilots"
    },
    {redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect"}
];

export default dashboardRoutes;
