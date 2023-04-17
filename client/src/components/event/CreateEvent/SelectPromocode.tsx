import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

interface Options {
    value: number;
    label: string;
}

type OptionType = {
    value: number;
    label: string;
};


function SelectPromocode({setSelectedPromocode}: any) {

    const [themes, setThemes] = useState<any[]>([]);
    const [selectPromocodeTmp, setSelectPromocodeTmp] = useState<any>([]);
    
    let options: Options[] = [];

    useEffect(() => {
        axios.get("http://localhost:8000/api/promocode").then((response) => {
            setThemes(response.data);
            console.log(response.data);
        })
    }, [])

    const handleChange = (selectedOption: any) => {
        SelectPromocode(selectedOption);
        setSelectPromocodeTmp(selectedOption);
    };


    if (themes) {
        themes.forEach((theme) => {
            options.push({ value: theme.Theme_ID, label: theme.title })
        })
    }

    return (
        <div>
            <Select
                closeMenuOnSelect={true}
                isMulti
                options={options}
                onChange={handleChange}
                // defaultInputValue={reset}
                required
            />
        </div>
    )
}

export default SelectPromocode;
