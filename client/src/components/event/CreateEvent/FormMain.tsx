import "./styleCreateEvent.scss";
import { useState } from "react";
import FormFirst from "./FormFirst";
import FormSecond from "./FormSecond";
import axios from "axios";

export function FormMain({setTitle, setDescription, setDate, setTime, setFile, 
    setSelectedThemes, setSelectedFormat, setEndDate
}:any) {

    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [date, setDate] = useState("");
    // const [time, setTime] = useState("");
    // const [location, setLocation] = useState("");
    // const [file, setFile] = useState<File>();
    // const [selectedThemes, setSelectedThemesTmp] = useState<any[]>([]);
    // const [selectedFormat, setSelectedFormat] = useState<any>([]);

    // let themes_ids: any[] = [];

    // if (selectedThemes.length) {
    //     selectedThemes.forEach((theme) => {
    //         themes_ids.push(theme!.value);
    //     });
    //     console.log("sdfghjkl");
    //     console.log(themes_ids);
    // }

    // function CreateEvent() {
        // let dataEvent = {
        //     title: title,
        //     description: description,
        //     date: date,
        //     time: time,
        //     location: location,
        //     file: file,
        //     format: selectedFormat!.value,
        //     themes: themes_ids
        // }

        // let formField = new FormData();
        // formField.append('title', title);
        // formField.append('description', description);
        // formField.append('date', date);
        // formField.append('time', time);
        // // formField.append('location', location);
        // formField.append('file', file!);
        // formField.append('format', selectedFormat!.value);
        // formField.append('themes', JSON.stringify(themes_ids));
        // axios.post("http://localhost:8000/api/event", formField, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // });
    // }

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
                // CreateEvent={CreateEvent}
            />
        </div>
    )
}