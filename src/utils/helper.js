import { EVENT_TYPE, PATH, MONTH } from "./constants";

export const filterCampaignData = (campaignData) => {
  const upcomingEvents = [];
  const pastEvents = [];
  const liveEvents = [];

  for (const event of campaignData) {
    const eventDate = new Date(event.date);
    const type = getEventType(eventDate);
    switch (type) {
      case EVENT_TYPE.LIVE:
        liveEvents.push(event);
        break;
      case EVENT_TYPE.UPCOMING:
        upcomingEvents.push(event);
        break;
      case EVENT_TYPE.PAST:
        pastEvents.push(event);
        break;
      default:
        break;
    }
  }
  return { upcomingEvents, pastEvents, liveEvents };
};

export const getEventType = (eventDate) => {
  const today = new Date();
  if (eventDate.toDateString() == today.toDateString()) {
    return EVENT_TYPE.LIVE;
  } else if (eventDate > today) {
    return EVENT_TYPE.UPCOMING;
  } else {
    return EVENT_TYPE.PAST;
  }
};
export const handleRedirectPath = (date) => {
  const eventtype = getEventType(date);
  console.log(eventtype);
  switch (eventtype) {
    case EVENT_TYPE.LIVE:
      return PATH.LIVE;
    case EVENT_TYPE.UPCOMING:
      return PATH.UPCOMING;
    case EVENT_TYPE.PAST:
      return PATH.PAST;
  }
};
export const getDays = (date) => {
  if (!date) return;
  const today = new Date();
  let eventDate = new Date(date);
  const diff = Math.floor((today - eventDate) / (1000 * 24 * 60 * 60));
  if (diff < 0) {
    return Math.abs(diff) + " Day" + (diff < -1 ? "s" : "") + " Ahead";
  } else if (diff > 0) {
    return Math.abs(diff) + " Day" + (diff > 1 ? "s" : "") + " Ago";
  } else {
    return "LIVE NOW";
  }
};

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  return `${MONTH[date.getMonth()]} ${date.getFullYear()}, ${date.getDate()}`;
};
