const events = [
  {
    id: 1,
    name: "Test Whatsapp",
    region: "US",
    createdOn: 1559807714999,
    price: {
      monthly: "100.00",
      halfyearly: "500.00",
      yearly: "900.00",
    },
    csv: "Some CSV link for Whatsapp",
    report: "Some report link for Whatsapp",
    image_url: "http://localhost:3001/events/Bitmap1.png",
    date: "05-06-2020",
  },
  {
    id: 2,
    name: "Super Jewels Quest",
    region: "CA, FR",
    createdOn: 1559806715124,
    price: {
      monthly: "90.00",
      halfyearly: "450.00",
      yearly: "800.00",
    },
    csv: "Some CSV link for Super Jewels Quest",
    report: "Some report link for Super Jewels Ques",
    image_url: "http://localhost:3001/events/Bitmap2.png",
    date: "06-06-2020",
  },
  {
    id: 3,
    name: "Mole Slayer",
    region: "FR",
    createdOn: 1559806711124,
    price: {
      monthly: "150.00",
      halfyearly: "700.00",
      yearly: "1200.00",
    },
    csv: "Some CSV link for Mole Slayer",
    report: "Some report link for Mole Slayer",
    image_url: "http://localhost:3001/events/Bitmap3.png",
    date: "07-06-2020",
  },
  {
    id: 4,
    name: "Mancala Mix",
    region: "JP",
    createdOn: 1559806680124,
    price: {
      monthly: "200.00",
      halfyearly: "900.00",
      yearly: "1600.00",
    },
    csv: "Some CSV link for Mancala Mix",
    report: "Some report link for Mancala Mix",
    image_url: "http://localhost:3001/events/Bitmap4.png",
    date: "04-06-2020",
  },
];

// // Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  events,
};
