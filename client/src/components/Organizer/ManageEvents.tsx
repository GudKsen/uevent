import Sidebar2 from "../sidebar/sidebar2"
import Header from "../sidebar/Header"
import AllEvents from "../Admin/Events/AllEvents"

import "./style.scss";

export function ManageEvents() {

    return (
        <div className="organizer-manage-events-page">

            <Sidebar2 />
            <div className="organizer-page">
                <Header />
                <div className="organizer-panel-content">
                    <AllEvents />
                </div>
            </div>

        </div>
    )
}