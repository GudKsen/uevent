import { Theme } from "../../entities/Theme/Theme.js";


export const CreateTheme = (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let theme = new Theme(title, description);
    
    theme.create();
    res.json("Created");
}

export const GetTheme = async (req, res) => {
    let id = parseInt(req.params.id);
    let theme = new Theme();

    theme.init(id);
    
    try {
        let data = await theme.read();
        res.send(data);
    } catch (err) {
        res.send("Error");
    }
}

export const GetAllThemes = async (req, res) => {
    let theme = new Theme();
    let data = await theme.readAll();
    res.json(data);
}

export const UpdateTheme = (req, res) => {
    let id = parseInt(req.params.id);
    let title = req.body.title;
    let description = req.body.description;
    
    let theme = new Theme(title, description);
    theme.init(id);
    theme.update(title);
    res.json('Updated');
}

export const DeleteTheme = (req, res) => {
    let id = parseInt(req.params.id);
    let theme = new Theme();

    theme.init(id);
    theme.delete();
    res.json('theme deleted');
}