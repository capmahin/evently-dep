export const headerLinks = [
  {
    label: "Home",
    route: "/"
  },
  {
    label: "Assignments",
    route: "/assignments"
  },
  {
    label: "My Submissions",
    route: "/profile"
  },
  {
    label: "Post Assignment",
    route: "/events/create"
  },
  {
    label: "Teachers",
    route: "/teachers"
  }
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(), // Assignment start date
  endDateTime: new Date(), // Submission deadline
  categoryId: "",
  price: "",
  isFree: false,
  url: "" // Reference/resource link
};

export const orderDefaultValues = {
  whatsappNumber: "",
  totalAmount: "",
  eventId: "",
  buyerName: "", // Student name
  buyerNumber: "", // Student ID / roll
  buyerEmail: "", // Student email
  status: "pending" as const, // pending | submitted | graded
  createdAt: new Date().toISOString().split("T")[0]
};
