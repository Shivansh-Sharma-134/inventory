const {Router} = require('express');
const categoriesRouter = Router();
const categoriesController = require("../controllers/categoriesController")

const { body, validationResult } = require("express-validator");

const validatCategory = [
    body("nameInput").trim().isLength({min: 1,max: 50}).withMessage('must be within 1 to 50 characters'),
    body("descriptionInput").trim().isLength({min: 1,max: 200}).withMessage('must be within 1 to 200 characters'),
]

categoriesRouter.get("/",categoriesController.listAllCategories)

categoriesRouter.get("/deletecategory/:categoryId",categoriesController.deleteCategory);

categoriesRouter.get("/editcategoryform/:categoryId", categoriesController.editCategoryForm);

categoriesRouter.post("/editcategory/:categoryId",validatCategory,categoriesController.editCategory);

categoriesRouter.post("/addcategory",validatCategory,categoriesController.addCategory);

categoriesRouter.get("/addcategoryform",categoriesController.addCategoryForm);









module.exports = categoriesRouter;