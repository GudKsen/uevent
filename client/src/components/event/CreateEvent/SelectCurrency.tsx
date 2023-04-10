import Select, { createFilter } from 'react-select';
import { useEffect, useState } from "react"

export function SelectCurrency({setSelectedCurrency}: any) {
    const [currencies, setCurrencies] = useState<any[]>();
    const [selectedCurrency, setTmpSelectedCurrency] = useState<any>("");

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("apikey", "Bx9Zhw56PPzWqj1GVTBsQRbER9KHoPwo");

        var requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
            .then(async response => {
                // console.log(JSON.parse(await response.text()));
                let symbols = JSON.parse(await response.text())
                let keys = Object.keys(symbols.symbols);
                let map = [];
                for (let i = 0; i < keys.length; i++)
                {
                    map.push({
                        value: keys[i],
                        label: keys[i]
                    })

                }
                setCurrencies(map);
            })
            .then(result => {console.log(result);   
        })
            .catch(error => console.log('error', error));
    }, [])

    function handleSelectCurrency(selectedOpt: any) {
        setTmpSelectedCurrency(selectedOpt);
        setSelectedCurrency(selectedOpt);
    }

    return (
        <div>
            <Select
                isSearchable={true}
                options={currencies}
                className='select-currency-field'
                onChange={handleSelectCurrency}
                filterOption={createFilter({ ignoreAccents: false })}
                placeholder={""}
                defaultValue={selectedCurrency}
            />

        </div>
    )
}