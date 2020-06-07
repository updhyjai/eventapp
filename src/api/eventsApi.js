import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/events/";

export function getCampaigns() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function updateCampaign(campaign) {
  return fetch(baseUrl + campaign.id || "", {
    method: campaign.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(campaign),
  })
    .then(handleResponse)
    .catch(handleError);
}
