import Sidebar2 from "../sidebar/sidebar2"
import Header from "../sidebar/Header"
// import AllEvents from "../Admin/Events/AllEvents"
import AllSubscribes from "./AllSubscribes";
import "../Admin/styles/styleAdminPanelMain.scss";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// import "../Admin/style.scss";

function Subscribes() {
    
    return (
        <div className="admin-panel">
            <Sidebar2 />
            <div className="admin-page">
                <div className="head">
                    <Header />
                </div>
                <div className="admin-panel-content">
                    {/* <ManageButtons setSave={setSave} /> */}
                    <div className="lists-contaner">
                        <Tabs>
                            <TabList>
                                <Tab>Subscribes</Tab>
                            </TabList>

                            <TabPanel className="panel">
                                {/* <AllEvents  /> */}
                                <AllSubscribes />
                            </TabPanel>

                        </Tabs>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Subscribes