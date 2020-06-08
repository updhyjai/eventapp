import React, { useState } from "react";
import PropTypes from "prop-types";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CampaignList.css";
import "./ReactCalender.css";
import priceImage from  "../../images/table/price.png";
import calendarImage from "../../images/table/calendar.png";
import reportImage from "../../images/table/report.png";
import fileImage from "../../images/table/file.png";
import { formatDate, getDays } from "../../utils/helper";

const CampaignList = ({
  campaigns,
  onClickViewPrice,
  onClickScheduleAgain,
}) => {
  const [openCalender, setCalenderStatus] = useState({});

  const handleClickScheduleButton = (name) => {
    let status = { ...openCalender };
    for (let key in status) {
      if (key == name) continue;
      status[key] = false;
    }
    console.log(status);
    if (name in status) {
      status[name] = !status[name];
    } else {
      status[name] = true;
    }
    console.log(status);
    setCalenderStatus(status);
  };

  const onDateSelection = (campaign, newDate) => {
    handleClickScheduleButton(campaign.name);
    onClickScheduleAgain(campaign, newDate);
  };

  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <th className="campaign-date-td">DATE</th>
          <th className="campaign-name-td">CAMPAIGN</th>
          <th>VIEW</th>
          <th colSpan={4}>ACTIONS</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {campaigns.map((campaign) => {
          return (
            <tr key={campaign.name}>
              <td className="campaign-date-td">
                <h6>{formatDate(campaign.date)}</h6>
                <p>{getDays(campaign.date)}</p>
              </td>
              <td className="campaign-name-td">
                <img className="campaign-image" src={campaign.image_url} />
                <span className="action-name">
                  <h6>{campaign.name}</h6>
                  <p>{campaign.region}</p>
                </span>
              </td>
              <td>
                <button
                  className="action-button"
                  onClick={() => onClickViewPrice(campaign)}
                >
                  <img className="action-image" src={priceImage} />
                  <span className="action-name">View Pricing</span>
                </button>
              </td>
              <td className="action-container">
                <button className="action-button">
                  <img className="action-image" src={fileImage} />
                  <span className="action-name">CSV</span>
                </button>
              </td>
              <td>
                <button className="action-button">
                  <img className="action-image" src={reportImage} />
                  <span className="action-name">Report</span>
                </button>
              </td>
              <td>
                <button
                  className="action-button"
                  onClick={() => handleClickScheduleButton(campaign.name)}
                >
                  <img className="action-image" src={calendarImage} />
                  <span className="action-name">Schedule Again</span>
                </button>
                {openCalender && openCalender[campaign.name] && (
                  <Calender
                    className="calender"
                    key={campaign.name}
                    value={new Date(campaign.date)}
                    onChange={(date) => onDateSelection(campaign, date)}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CampaignList.propTypes = {
  campaigns: PropTypes.array.isRequired,
  onClickScheduleAgain: PropTypes.func.isRequired,
  onClickViewPrice: PropTypes.func.isRequired,
};

export default CampaignList;
