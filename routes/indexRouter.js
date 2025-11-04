const { Router } = require("express");
const indexRouter = Router();
const controller = require("../controllers/indexController");

indexRouter.get("/", (req, res) => {
  res.render("index");
});
indexRouter.get("/log-in",(req,res)=>{
  res.render("log-in")
})
indexRouter.get("/sign-up",(req,res)=>{
  res.render("sign-up")
})
module.exports = indexRouter;
