const {Router} = require('express');
const categoriesRouter = Router();
const categoriesController = require("../controllers/categoriesController")

const { body, validationResult } = require("express-validator");

const validatCategory = [
    body("nameInput").trim().isLength({min: 1,max: 50}).withMessage('must be within 1 to 50 characters'),
    body("descriptionInput").trim().isLength({min: 1,max: 200}).withMessage('must be within 1 to 200 characters'),
]

categoriesRouter.get("/",categoriesController.listAllCategories)

indexRouter.get("/deletecategory/:categoryId",categoriesController.deleteCategory)

indexRouter.get("/editcategoriesform/:categoryId", categoriesController.editCategoryForm)

indexRouter.post("/editcategory/:categoryId",validatCategory,categoriesController.editCategory)

indexRouter.post("/addcategory",validatCategory,categoriesController.addCategory)

indexRouter.get("/addcategoryform",categoriesController.addCategoryForm)









module.exports = categoriesRouter;