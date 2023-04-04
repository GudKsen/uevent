import axios from "axios";
import { useEffect, useState } from "react"
import DragDrop from "../event/DragAndDrop";

interface IOrganization {
    Company_ID: number,
    name: string,
    description: string,
    email: string,
    image: string
}

interface ILocation {
    country: string,
    city: string
}

export function OrganizationPage() {
    const [organization, setOrganization] = useState<IOrganization>();
    const [location, setLocation] = useState<ILocation>();
    const [file, setFile] = useState<File>();
    const [loadings, setLoadings] = useState(false);

    function updatePicture() {
        let formField = new FormData();
        formField.append('file', file!);
        axios.patch(`http://localhost:8000/api/company/${organization?.Company_ID}`, formField, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': localStorage!.getItem("token")!
            }
        })
        .then(res => {
            //setOrganization(res.data);
            //console.log("🚀 ~ file: OrganizationPage.tsx:37 ~ updatePicture ~ res:", res.data);
            // setLoadings(true);
            UpdateFrontData();
        });
            
    }

    function UpdateFrontData()
    {
        axios.get("http://localhost:8000/api/company/user", {
            params: { token: localStorage.getItem("token") }
        }).then((response) => {
            setOrganization(response.data.data[0]);
            setLocation(response.data.dataLocation[0]);
        });
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/company/user", {
            params: { token: localStorage.getItem("token") }
        }).then((response) => {
            setOrganization(response.data.data[0]);
            setLocation(response.data.dataLocation[0]);
        });
    }, []);


    return (
        <div>
            <h1>
                It's organization's page. Here you can see the information, update it or delete it.
            </h1>
            {organization ?

                <div>
                    <div className="file-create-event field">
                        <div>UPLOAD POSTER</div>
                        <DragDrop setFile={setFile} />
                    </div>
                    <button className="button" onClick={e => updatePicture()}>Update</button>
                    <div>
                        { organization.image ?
                        <img className="avatarPicture" src={`http://localhost:8000/company/${organization.image}`} alt="" />
                        :
                        <img className="avatarPicture" src={`http://localhost:8000/images/no_photo.jpg`} alt="" />    
                        }
                    </div>
                    <div>{organization.name}</div>
                    <div>{organization.description}</div>
                    <div>{organization.email}</div>
                    {location ?
                        <div>
                            <div>{location.country}</div>
                            <div>{location.city}</div>
                        </div>
                        :
                        <div>-</div>
                    }

                </div>
                : <div></div>



            }

        </div>
    )
}