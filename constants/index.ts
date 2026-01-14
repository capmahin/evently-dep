export const headerLinks = [
  {
    label: "Home",
    route: "/"
  },
  {
    label: "flight",
    route: "/"
  },
  {
    label: "hotel",
    route: "/"
  },
  {
    label: "shop",
    route: "/"
  },
  {
    label: "Holiday Packages",
    route: "/"
  },
  {
    label: "Gift Cards",
    route: "/"
  },

  {
    label: "Create Packages",
    route: "/events/create"
  },

  {
    label: "Packages",
    route: "/profile"
  }
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: ""
};
