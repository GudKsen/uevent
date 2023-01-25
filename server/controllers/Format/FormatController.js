import { Format } from "../../entities/Format/Format.js";


export const CreateFormat = (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let format = new Format(title, description);
    
    format.create();
    res.json("Created");
}

export const GetFormat = async (req, res) => {
    let id = parseInt(req.params.id);
    let format = new Format();

    format.init(id);
    
    try {
        let data = await format.read();
        res.send(data);
    } catch (err) {
        res.send("Error");
    }
}

export const GetAllFormats = async (req, res) => {
    let format = new Format();
    let data = await format.readAll();
    res.json(data);
}

export const UpdateFormat = (req, res) => {
    let id = parseInt(req.params.id);
    let title = req.body.title;
    let description = req.body.description;
    
    let format = new Format(title, description);
    format.init(id);
    format.update(title);
    res.json('Updated');
}

export const DeleteFormat = (req, res) => {
    let id = parseInt(req.params.id);
    let format = new Format();

    format.init(id);
    format.delete();
    res.json('format deleted');
}