import axios from "axios";
import "./style.scss";

function ManageButtons ({data, type}: any)
{
    function deleteData()
    {
        axios.delete("http://localhost:8080/api/")
    }

    

    return (
        <div className="manage-button">
            <div>
                <button className="button-delete">
                    {/* <img src={require("../../../public/video/trash-9-512.png")} alt=""></img> */}
                    Delete
                </button>
            </div>

            <div>
                <button className="button-create-new">
                    {/* <img src={require("../../../public/video/plus-7-512.png")} alt=""></img> */}
                    Add new
                </button>
            </div>


            <div>
                <button className="button-save-changes" >
                    {/* <img src={require("../../../public/video/save-512.png")} alt=""></img> */}
                    Save
                </button>
            </div>
        </div>
    )
}

export default ManageButtons;
