import Header from "../sidebar/Header";
import Sidebar2 from "../sidebar/sidebar2";
import "./styles/styleAdminPanelMain.scss";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from "react";
import AllUsers from "./AllUsers";
import AllEvents from "./Events/AllEvents";
import ManageButtons from "./buttons/ManageButtons";
import AllThemes from "./AllThemes";
import AllCompanies from "./AllCompanies";
import AllFormats from "./AllFormats";

function AdminPanel() {
    const [save, setSave] = useState(false);

    // useEffect(() => {
    //     document.body.style.overflow = "hidden";
    //     return () => {
    //         document.body.style.overflow = "visible";
    //     }
    // }, [])

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
                                    <Tab>Users</Tab>
                                    <Tab>Events</Tab>
                                    <Tab>Companies</Tab>
                                    <Tab>Themes</Tab>
                                    <Tab>Formats</Tab>
                                </TabList>

                                <TabPanel className="panel">
                                    <div>
                                        <AllUsers />
                                    </div>
                                </TabPanel>

                                <TabPanel className="panel">
                                    <AllEvents saveMove={save} />
                                </TabPanel>

                                <TabPanel className="panel">
                                    <AllCompanies />
                                </TabPanel>

                                <TabPanel className="panel">
                                    <AllThemes />
                                </TabPanel>

                                <TabPanel className="panel">
                                    <AllFormats />
                                </TabPanel>
                            </Tabs>
                        </div>

                    </div>
            </div>
        </div>
    )
}

export default AdminPanel;