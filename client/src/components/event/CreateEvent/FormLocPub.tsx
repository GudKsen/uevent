import "./styleCreateEvent.scss";
import LocationForm from "./LocationForm";
import PublishForm from "./PublishForm";

export function FormLocPub({setSelectedCountry, setSelectedState, setSelectedCity , setStreetCompany, setNumberStreetCompany,
        setPrice, setPublishDate, setReceive, setSee, setCountTicket, CreateEvent, setCurrency
    }: any) {
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
                setCurrency={setCurrency}
            />
        </div>
    )
}