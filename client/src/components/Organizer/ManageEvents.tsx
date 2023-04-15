import Sidebar2 from "../sidebar/sidebar2"
import Header from "../sidebar/Header"
import AllEvents from "../Admin/Events/AllEvents"
import "../Admin/styles/styleAdminPanelMain.scss";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import "./style.scss";

export function ManageEvents() {

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
                                <Tab>Events</Tab>
                            </TabList>

                            <TabPanel className="panel">
                                <AllEvents />
                            </TabPanel>

                        </Tabs>
                    </div>

                </div>

            </div>
        </div>
    )
}