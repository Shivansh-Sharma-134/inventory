const db = require("../data/queries");
const { validationResult } = require("express-validator");

async function listAllCategories(req,res) {
    const categories = await db.getCategories();
    res.render("allcategories.ejs",{categories: categories})
}

async function editCategoryForm(req,res) {
    const category = await db.getCategory(req.params.categoryId);
    res.render("editcategoryform", {
        category: category,
        old:{},
        errors: {}
    })
}

async function deleteCategory(req,res) {
    const gameId = req.params.categoryId;
    await db.deleteGame(categoryId);
    res.redirect("/categories");
}

async function addCategoryForm(req,res) {
    res.render("addcategoryform", {
        old:{},
        errors: {}
    });
}

async function addCategory(req,res) {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const errArray = errors.array();
        const errorMap = {}
        errArray.forEach(err => {
            errorMap[err.path] = err.msg;
        })
        console.log(errorMap);

        return res.status(400).render("addcategoryform",{
            title: "Add Category",
            errors: errorMap,
            old: req.body
        })
    }
    const {nameInput,descriptionInput} = req.body

    await db.addGame(nameInput,descriptionInput);

    res.redirect("/items");
}

async function editCategory(req,res) {
    const category = await db.getCategory(req.params.categoryId);
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const errArray = errors.array();
        const errorMap = {}
        errArray.forEach(err => {
            errorMap[err.path] = err.msg;
        })
        console.log(errorMap);
        return res.status(400).render(`editcategoryform`,{
            title: "Edit category",
            errors: errorMap,
            old: req.body,
            category
        })
    }
   
    const categoryId = req.params.categoryId;
    const {nameInput,descriptionInput} = req.body

    await db.editCategory(nameInput,descriptionInput,categoryId);

    res.redirect("/categories");
}

module.exports = {listAllCategories,
    editCategoryForm,
    editCategory,
    deleteCategory,
    addCategoryForm,
    addCategory
}