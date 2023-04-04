import axios from "axios";

export function UpdateTableEvent() {
    axios.get("http://localhost:8000/api/events").then((response) => {
        // setEvents(response.data);
        console.log(response.data);
    })
}