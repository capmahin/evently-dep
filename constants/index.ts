export const headerLinks = [
  {
    label: "Home",
    route: "/"
  },
  {
    label: "Create assignments",
    route: "/events/create"
  },

  {
    label: "Student Assignment Submission list",
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
