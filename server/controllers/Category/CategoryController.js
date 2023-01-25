import { Category } from "../../entities/Category/Category.js";


export const CreateCategory = (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let category = new Category(title, description);
    
    category.create();
    res.json("Created");
}

export const GetCategory = async (req, res) => {
    let id = parseInt(req.params.id);
    let category = new Category();

    category.init(id);
    
    try {
        let data = await category.read();
        res.send(data);
    } catch (err) {
        res.send("Error");
    }
}

export const GetAllCategories = async (req, res) => {
    let category = new Category();
    let data = await category.readAll();
    res.json(data);
}

export const UpdateCategory = (req, res) => {
    let id = parseInt(req.params.id);
    let title = req.body.title;
    let description = req.body.description;
    
    let category = new Category(title, description);
    category.init(id);
    category.update(title);
    res.json('Updated');
}

export const DeleteCategory = (req, res) => {
    let id = parseInt(req.params.id);
    let category = new Category();

    category.init(id);
    category.delete();
    res.json('category deleted');
}