import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
// eslint-disable-next-line import/no-named-as-default
import CampaignPage from "./campaigns/CampaignPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCampaigns, updateCampaign } from "../api/eventsApi";
import { filterCampaignData } from "../utils/helper";
import Spinner from "./common/Spinner";

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
    // this.onScheduleUpdate();
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

  componentDidUpdate() {
    console.log("I am in update");
  }

  render() {
    console.log(this.state.apiCallInProgress);
    return (
      <>
        <div className="container-fluid">
          <Header />
          {this.state.apiCallInProgress ? (
            <Spinner />
          ) : (
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <CampaignPage
                    campaignData={this.state.upcomingEvents}
                    handleScheduleUpdate={this.onScheduleUpdate}
                    // redirectTo={this.state.redirectTo}
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
                    // redirectTo={this.state.redirectTo}
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
                    // redirectTo={this.state.redirectTo}
                  />
                )}
              />

              <Route component={PageNotFound} />
            </Switch>
          )}
          <ToastContainer autoClose={3000} />
        </div>
      </>
    );
  }
}

export default App;
