import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'



interface Options {
    value: number;
    label: string;
}

function SelectFormat({setSelectedFormat}: any)
{
    const [formats, setFormats] = useState<any[]>([]);
    let options: Options[] = [];
    const [formatTmp, setFormatTmp] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/formats").then((response) => {
            setFormats(response.data);
            // console.log(response.data);
        })
    }, [])

    if (formats) {
        formats.forEach((format) =>
        {
            options.push({value: format.Format_ID, label: format.title})
            // console.log(options.length);
        })
    }

    const handleChange = (selectedOption: any) => {
        setSelectedFormat(selectedOption);
        setFormatTmp(selectedOption);
    };

    return (
        <div>
            <Select
                closeMenuOnSelect={true}
                options={options}
                isClearable={true}
                isSearchable
                onChange={handleChange}
                defaultValue = {formatTmp}
                required
            />
        </div>
    )
}

export default SelectFormat;

