export const headerLinks = [
  {
    label: "Home",
    route: "/",
    role: null // সবার জন্য
  },
  {
    label: "Assignments",
    route: "/assignments",
    role: null // সবার জন্য
  },
  {
    label: "My Submissions",
    route: "/profile",
    role: "student" // শুধু student
  },
  {
    label: "Post Assignment",
    route: "/events/create",
    role: "teacher" // শুধু teacher
  },
  {
    label: "Assignment Marks",
    route: "/marks",
    role: "teacher" // শুধু teacher
  },
  {
    label: "Students List",
    route: "/students",
    role: "teacher" // শুধু teacher
  },
  {
    label: "Teachers",
    route: "/teachers",
    role: null // সবার জন্য
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
  createdAt: new Date().toISOString().split("T")[0]
};