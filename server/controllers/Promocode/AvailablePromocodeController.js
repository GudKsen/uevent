// AvailablePromocodeController
import { Promocode } from "../../entities/Promocode/Promocode.js";
import { DatabaseGet } from "../../database/DB_Functions/DatabaseGet.js";
import { User } from "../../entities/User/User.js";


export const CheckToAvailablePromocode = async (req, res) => {
    
    let promo = req.body.promo;
    let id_event = req.body.id_event;

    let db = new DatabaseGet();

    let promocode = await db.get_promocod_by_event_id(promo, id_event);


    if(!promocode){
        // res.json(proverka);
        res.json("Not available")
    }else if(promocode[0].title == promo){
        
        res.json(Number(promocode[0].discount));
    } else{
        res.json("Not available")
    }

    
}
