import { Company } from "../../entities/Company/Company.js";


export const CreateCompany = (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let company = new Company(title, description);
    
    company.create();
    res.json("Created");
}

export const GetCompany = async (req, res) => {
    let id = parseInt(req.params.id);
    let company = new Company();

    company.init(id);
    
    try {
        let data = await company.read();
        res.send(data);
    } catch (err) {
        res.send("Error");
    }
}

export const GetCompanies = async (req, res) => {
    let company = new Company();
    let data = await company.readAll();
    res.json(data);
}

export const UpdateCompany = (req, res) => {
    let id = parseInt(req.params.id);
    let title = req.body.title;
    let description = req.body.description;
    
    let company = new Company(title, description);
    company.init(id);
    company.update(title);
    res.json('Updated');
}

export const DeleteCompany = (req, res) => {
    let id = parseInt(req.params.id);
    let company = new Company();

    company.init(id);
    company.delete();
    res.json('company deleted');
}