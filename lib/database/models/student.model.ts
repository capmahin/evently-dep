import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: any;
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl: string;
  url?: string;
  category: { _id: any; name: string };
  organizer: { _id: any; firstName: string; lastName: string };
}

const StudentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" }
});

const Student = models.Student || model("Student", StudentSchema);

export default Student;
