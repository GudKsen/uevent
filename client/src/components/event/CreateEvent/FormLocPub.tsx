import "./styleCreateEvent.scss";
import { useState } from "react";
import LocationForm from "./LocationForm";
import PublishForm from "./PublishForm";
import axios from "axios";

// export function FormLocPub() {
export function FormLocPub({setSelectedCountry, setSelectedState, setSelectedCity , setStreetCompany, setNumberStreetCompany,
        setPrice, setPublishDate, setReceive, setSee, setCountTicket, CreateEvent
    }: any) {

    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [date, setDate] = useState("");
    // const [time, setTime] = useState("");
    // const [location, setLocation] = useState("");
    // const [file, setFile] = useState<File>();
    // const [selectedThemes, setSelectedThemes] = useState<any[]>([]);
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
            <LocationForm
                setSelectedCountry={setSelectedCountry}
                setSelectedState={setSelectedState}
                setSelectedCity={setSelectedCity}
                setStreetCompany={setStreetCompany}
                setNumberStreetCompany={setNumberStreetCompany}
            />

            <PublishForm
                setPrice={setPrice}
                setPublishDate={setPublishDate}
                setReceive={setReceive}
                setSee={setSee}
                setCountTicket={setCountTicket}
                CreateEvent={CreateEvent}
            />
        </div>
    )
}