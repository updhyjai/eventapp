import React from "react";
import PropTypes from "prop-types";
import CampaignList from "./CampaignList";
import { Redirect } from "react-router-dom";
import PricingModal from "../common/PricingModal";
import "react-responsive-modal/styles.css";
import { handleRedirectPath } from "../../utils/helper";

class CampaignPage extends React.Component {
  state = {
    openPricingModal: false,
    price: {},
    openCalender: false,
    campaignToSchedule: {},
    redirectTo: "",
    image_url: "",
    name: "",
    region: "",
  };

  handleViewPrice = (campaign) => {
    const { price, image_url, name, region } = campaign;
    this.setState(() => ({
      openPricingModal: true,
      price,
      image_url,
      name,
      region,
    }));
  };
  handleCloseModal = () => {
    this.setState(() => ({
      openPricingModal: false,
      price: {},
      image_url: "",
      name: "",
      region: "",
    }));
  };
  validateCampaignData = (campaign, date) => {
    return campaign && campaign.date && date;
  };

  handleSchedule = (campaign, date) => {
    date = new Date(date);
    if (!this.validateCampaignData(campaign, date)) {
      throw new Error("Error while Scheduling");
    }
    const campaignToUpdate = Object.assign({}, campaign, {
      date: date.toDateString(),
    });
    this.setState(
      {
        redirectTo: handleRedirectPath(date),
      },
      () => this.props.handleScheduleUpdate(campaignToUpdate)
    );
  };

  render() {
    return this.props.campaignData ? (
      <>
        {this.state.redirectTo && <Redirect to={this.state.redirectTo} />}
        {this.state.openPricingModal && (
          <PricingModal
            isOpen={this.state.openPricingModal}
            price={this.state.price}
            onClose={this.handleCloseModal}
            image_url={this.state.image_url}
            name={this.state.name}
            region={this.state.region}
          />
        )}
        <CampaignList
          onClickScheduleAgain={this.handleSchedule}
          onClickViewPrice={this.handleViewPrice}
          campaigns={this.props.campaignData}
        />
      </>
    ) : null;
  }
}

CampaignPage.propTypes = {
  campaignData: PropTypes.array.isRequired,
  handleScheduleUpdate: PropTypes.func.isRequired,
};
export default CampaignPage;
