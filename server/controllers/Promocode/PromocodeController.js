import { Promocode } from "../../entities/Promocode/Promocode.js";
import { DatabaseGet } from "../../database/DB_Functions/DatabaseGet.js";
import { User } from "../../entities/User/User.js";


export const CreatePromocode = (req, res) => {
    console.log(req.body.title, req.body.description, req.body.discont, req.body.startDateTime, req.body.endDateTime)
    let title = req.body.title;
    let description = req.body.description;
    let discont = req.body.discont;
    let startDateTime = req.body.startDateTime;
    let endDateTime = req.body.endDateTime;
    let User_id = req.user._id;
    let theme = new Promocode(title, description, discont, new Date(startDateTime), new Date(endDateTime), User_id);
    
    theme.create();
    res.json("Created");
}

export const GetPromocode = async (req, res) => {
    let id = parseInt(req.params.id);
    let theme = new Promocode();

    theme.init(id);
    
    try {
        let data = await theme.read();
        res.send(data);
    } catch (err) {
        res.send("Error");
    }
}

export const GetAllPromocodeByIdUser = async (req, res) => {
    let db = new DatabaseGet();
    let company = await db.get_company_by_userID(req.user._id)
    console.log("🚀 ~ file: PromocodeController.js:37 ~ GetAllPromocodeByIdUser ~ company:", company)
    let prom = await db.get_prom_by_company_id(company[0].Company_ID);
    res.json(prom);
}


export const GetAllPromocode = async (req, res) => {
    let theme = new Promocode();
    let data = await theme.readAll();
    res.json(data);
}

export const UpdatePromocode = (req, res) => {
    let id = parseInt(req.params.id);
    let title = req.body.title;
    let description = req.body.description;
    let discount = req.body.discount;
    
    let theme = new Promocode(title, description, discount);
    theme.init(id);
    theme.update(title);
    res.json('Updated');
}

export const DeletePromocode = (req, res) => {
    let id = parseInt(req.params.id);
    let theme = new Promocode();

    theme.init(id);
    theme.delete();
    res.json('theme deleted');
}