import React from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./PageNotFound";
// eslint-disable-next-line import/no-named-as-default
import CampaignPage from "./campaigns/CampaignPage";
import { getCampaigns, updateCampaign } from "../api/eventsApi";
import { filterCampaignData } from "../utils/helper";
import Spinner from "./common/Spinner";
import AppBar from "./common/AppBar";
import NavBar from "./common/NavBar";

class App extends React.PureComponent {
  state = {
    upcomingEvents: [],
    pastEvents: [],
    liveEvents: [],
    apiCallInProgress: false,
    redirectTo: "",
  };

  validateCampaignData = (data = []) => {
    if (data && data.length > 0) return true;
    return false;
  };

  componentDidMount() {
    this.callAndWait(this.getCampaignData);
  }
  getCampaignData = () => {
    getCampaigns()
      .then((campaignData) => {
        if (!this.validateCampaignData(campaignData)) {
          throw new Error("Campaign Data is not valid");
        }
        const { liveEvents, pastEvents, upcomingEvents } = filterCampaignData(
          campaignData
        );
        this.setState(() => ({
          liveEvents,
          pastEvents,
          upcomingEvents,
          apiCallInProgress: false,
        }));
      })
      .catch((err) => console.log("Error retrieving data: ", err));
  };

  callAndWait = (_call, args) => {
    this.setState(
      () => ({
        apiCallInProgress: true,
      }),
      () => _call(args)
    );
  };

  updateCampaignData = (campaignData) => {
    updateCampaign(campaignData)
      .then((response) => {
        if (response) {
          this.getCampaignData();
        }
      })
      .catch((err) => {
        throw new Error("Error while udpating campaign :" + err);
      });
  };
  onScheduleUpdate = (campaignData) => {
    this.callAndWait(this.updateCampaignData, campaignData);
  };

  render() {
    console.log(this.state.apiCallInProgress);
    return (
      <div className="container-fluid">
        <AppBar />
        {this.state.apiCallInProgress ? (
          <Spinner />
        ) : (
          <>
            <NavBar />
            <br />
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <CampaignPage
                    campaignData={this.state.upcomingEvents}
                    handleScheduleUpdate={this.onScheduleUpdate}
                  />
                )}
              />
              <Route
                exact
                path="/livecampaigns"
                component={() => (
                  <CampaignPage
                    campaignData={this.state.liveEvents}
                    handleScheduleUpdate={this.onScheduleUpdate}
                  />
                )}
              />
              <Route
                exact
                path="/pastcampaigns"
                component={() => (
                  <CampaignPage
                    campaignData={this.state.pastEvents}
                    handleScheduleUpdate={this.onScheduleUpdate}
                  />
                )}
              />

              <Route component={PageNotFound} />
            </Switch>
          </>
        )}
      </div>
    );
  }
}

export default App;
