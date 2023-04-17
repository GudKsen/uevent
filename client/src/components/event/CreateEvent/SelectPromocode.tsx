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

    const [prom, setpromocode] = useState<any[]>([]);
    const [selectPromocodeTmp, setSelectPromocodeTmp] = useState<any>([]);
    let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
    const [organization, setOrganization] = useState();
    
    let options: Options[] = [];

    useEffect(() => {
        axios.get("http://localhost:8000/api/promocode", {
            params: { token: localStorage.getItem("token") }
        }).then((response) => {
            setpromocode(response.data);
            console.log(response.data);
        })
    }, [])

    // useEffect(() => {
    //     if (userInfo.role === "organizer") {
    //         axios.get(`http://localhost:8000/api/company/user`, {
    //             headers: {
    //                 token: localStorage.getItem("token")!
    //             }
    //         }).then(async response => {
    //             console.log(response.data.data[0].Company_ID);
    //             setOrganization(response.data.data);
    //             let id = response.data.data[0].Company_ID;
    //             if (response.data.data.length > 0) {
    //                 axios.get("http://localhost:8000/api/promocodesId", {
    //                     params: { token: localStorage.getItem("token") }
    //                     }).then((response) => {
    //                         setpromocode(response.data);
    //                         console.log("sfffffffffffffffffffffffffffffffffffffff");
    //                         console.log(response.data[0]);
    //                         console.log("sfffffffffffffffffffffffffffffffffffffff");
    //                     })
    //             }
    //         })
    //     }
    // }, [])


    const handleChange = (selectedOption: any) => {
        SelectPromocode(selectedOption);
        setSelectPromocodeTmp(selectedOption);
    };


    if (prom) {
        prom.forEach((theme) => {
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
