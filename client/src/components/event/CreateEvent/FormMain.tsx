import "./styleCreateEvent.scss";
import { useState } from "react";
import FormFirst from "./FormFirst";
import FormSecond from "./FormSecond";
import axios from "axios";

export function FormMain({setTitle, setDescription, setDate, setTime, setFile, 
    setSelectedThemes, setSelectedPromocode, setSelectedFormat, setEndDate
}:any) {

    return (
        <div className="create-forms-container">
            <FormFirst
                setTitle={setTitle}
                setDescription={setDescription}
                setDate={setDate}
                setTime={setTime}
                setFile={setFile}
                setEndDate={setEndDate}
            />

            <FormSecond
                setSelectedThemes={setSelectedThemes}
                setSelectedFormat={setSelectedFormat}
                setSelectedPromocode={setSelectedPromocode}
                // CreateEvent={CreateEvent}
            />
        </div>
    )
}