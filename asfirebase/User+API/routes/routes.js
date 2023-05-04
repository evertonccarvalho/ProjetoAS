var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth");
var ObitosCrontoller = require("../controllers/ObitosCrontoller");

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get("/user",AdminAuth,UserController.index);
router.get("/user/:id",AdminAuth,UserController.findUser);
router.put("/user",AdminAuth,UserController.edit);
router.delete("/user/:id",AdminAuth,UserController.remove);
router.post("/recoverpassword",UserController.recoverPassword);
router.post("/changepassword",UserController.changePassword);
router.post("/login",UserController.login);
router.post("/validate",AdminAuth,HomeController.validate);

router.post('/ssa2',ObitosCrontoller.create);
router.post('/nascidosvivos',ObitosCrontoller.createVivos);



router.delete("/formularios/:id",ObitosCrontoller.removeForm);

router.post('/obitos',ObitosCrontoller.createObitos);
router.get("/formularios",ObitosCrontoller.indexForm); //ok
router.get("/formularios/:id",ObitosCrontoller.findForm); //ok
router.put("/formularios",ObitosCrontoller.editForm);

module.exports = router;