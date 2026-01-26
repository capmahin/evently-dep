export const headerLinks = [
  {
    label: "Home",
    route: "/"
  },
  {
    label: "About",
    route: "/"
  },
  {
    label: "Services",
    route: "/"
  },
  {
    label: "Project",
    route: "/"
  },
 
  {
    label: "Create Packages",
    route: "/events/create"
  },


  {
    label: "Our-Packages",
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

export const orderDefaultValues = {
  whatsappNumber: "",
  totalAmount: "",
  eventId: "",
  buyerName: "",
  buyerNumber: "",
  buyerEmail: "",
  status: "pending" as const,
  createdAt: new Date().toISOString().split('T')[0],
};
