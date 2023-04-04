import DragDrop from "../DragAndDrop";
import "./styleCreateEvent.scss";
import { useState } from "react";

function FormFirst({
    setTitle, setDescription, setDate, setTime, setFile, setEndDate
}: any) {
    // const [title, setTitleTmp] = useState("");
    // const [description, setDescriptionTmp] = useState("");
    // const [date, setDateTmp] = useState("");
    // const [time, setTimeTmp] = useState("");
    // const [endDate, setEndDateTmp] = useState("");
    // const [file, setFileTmp] = useState<File>();
    

    return (
        <div className="create-form1">
            <div className="create-form1-content">
                <div className="title-create-event-form field">
                    <div>TITLE</div>
                    <div>
                        <input type="text" className="tit"
                        onChange={(e) => {setTitle(e.target.value)}} required
                        ></input>
                    </div>
                </div>

                <div className="description-create-event field">
                    <div>DESCRIPTION</div>
                    <div>
                        <textarea className="descr is-focused"
                        onChange={e => {setDescription(e.target.value)}} required
                        ></textarea>
                    </div>
                </div>

                <div className="date-create-event field">
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>START DATE</td>
                                    <td>TIME</td>
                                    <td>END DATE</td>
                                    <td>DURATION</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="date" className=""
                                        onChange={e => {setDate(e.target.value)}} required
                                        ></input>
                                    </td>
                                    <td>
                                        <input type="time" step="3600000" 
                                        onChange={e => {setTime(e.target.value)}} required
                                        />
                                    </td>
                                    <td>
                                        <input type="date" className=""
                                        onChange={e => {setEndDate(e.target.value)}} required
                                        ></input>
                                    </td>
                                    <td>
                                        <input type="time" className=""></input>
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                

                <div className="file-create-event field">
                    <div>UPLOAD POSTER</div>
                    <DragDrop setFile={setFile}/>
                </div>
            </div>


        </div>
    )
}

export default FormFirst;