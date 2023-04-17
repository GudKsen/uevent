// AvailablePromocodeController
import { Promocode } from "../../entities/Promocode/Promocode.js";
import { DatabaseGet } from "../../database/DB_Functions/DatabaseGet.js";
import { User } from "../../entities/User/User.js";


export const CheckToAvailablePromocode = async (req, res) => {
    
    let promo = req.body.promo;
    let id_event = req.body.id_event;

    let db = new DatabaseGet();

    let promocode = await db.get_promocod_by_event_id(promo, id_event);

    let proverka = 10;

    if(!promocode){
        res.json(proverka);
        // res.json("Not available")
    }else{
        
        res.json(promocode.discount);
    }

    
}
