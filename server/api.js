const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
// const cache = require('koache')
const bodyParser = require("koa-bodyparser");
const socketio = require("socket.io");
require("dotenv").config();

// Controllers
const MembersController = require("./controllers/MembersController");
const TasksController = require("./controllers/TasksController");
const GitlabController = require("./controllers/GitlabController");
const SheetController = require("./controllers/SheetController");

// Constants
const port = process.env.PORT || 8080;

// Instances
const app = new Koa();
const server = require("http").createServer(app.callback());
const router = new Router();
const io = socketio(server);

// require("./socket.js")(io);

app.use(bodyParser());
app.use(cors());
// @development app.use(cache({ stdTTL: 10, checkperiod: 10 }))

router.get("/tasks", TasksController.getTasks);
router.get("/tasks/unestimated", TasksController.getUnestimated);
router.get("/tasks/:id", TasksController.getTask);

router.get("/members", MembersController.getMembers);
router.get("/members/:id", MembersController.getMember);

router.get("/sheet/times", SheetController.getTimes);
router.get("/sheet/tasks", SheetController.getTasks);

router.post("/gitlab/members", GitlabController.setMembers);
router.post("/gitlab/issues", GitlabController.setIssues);
router.post("/gitlab/mrs", GitlabController.setMrs);
router.post("/gitlab/comments", GitlabController.setComments);

app.use(router.routes()).use(router.allowedMethods());

server.listen(port, () => console.log(`Listening on port ${port}`));
