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


function SelectTheme({setSelectedThemes}: any) {

    const [themes, setThemes] = useState<any[]>([]);
    const [selectedThemesTmp, setSelectedThemesTmp] = useState<any>([]);
    
    let options: Options[] = [];

    useEffect(() => {
        axios.get("http://localhost:8000/api/themes").then((response) => {
            setThemes(response.data);
            console.log(response.data);
        })
    }, [])

    const handleChange = (selectedOption: any) => {
        setSelectedThemes(selectedOption);
        setSelectedThemesTmp(selectedOption);
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

export default SelectTheme;
