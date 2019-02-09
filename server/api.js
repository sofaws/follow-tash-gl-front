const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
// const cache = require('koache')
const bodyParser = require("koa-bodyparser");

// Controllers
const MembersController = require("./controllers/MembersController");
const TasksController = require("./controllers/TasksController");
const GitlabController = require("./controllers/GitlabController");

// Constants
const port = process.env.PORT || 8080;

// Instances
const app = new Koa();
const router = new Router();
// TODO: increase TTL

app.use(bodyParser());
app.use(cors());
// @development app.use(cache({ stdTTL: 10, checkperiod: 10 }))

router.get("/tasks", TasksController.getTasks);
router.get("/tasks/unestimated", TasksController.getUnestimated);
router.get("/tasks/:id", TasksController.getTask);

router.get("/members", MembersController.getMembers);
router.get("/members/:id", MembersController.getMember);

router.post("/gitlab/members", GitlabController.setMembers);
router.post("/gitlab/issues", GitlabController.setIssues);
router.post("/gitlab/mrs", GitlabController.setMrs);
router.post("/gitlab/comments", GitlabController.setComments);

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => console.log(`Listening on port ${port}`));
