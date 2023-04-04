import axios from "axios";
import { useEffect, useState } from "react";
import SelectFormat from "../event/CreateEvent/SelectFormat";
import SelectTheme from "../event/CreateEvent/SelectTheme";

/*TODO: Modal window for filter */

export function Filter () 
{
    const [formats, setFormats] = useState<any[]>([]);
    const [themes, setThemes] = useState<any[]>([]);
    
   

    return (
        <div>
            <SelectTheme setSelectedThemes={setThemes}/>
            <SelectFormat setSelectedFormat={setFormats}/>
        </div>
    )
}