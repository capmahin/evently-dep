"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import * as z from "zod";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import {
  BookOpen,
  MapPin,
  Calendar,
  Link2,
  Tag,
  GraduationCap
} from "lucide-react";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime)
        }
      : eventDefaultValues;

  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) return;
      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile"
        });
        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }
      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`
        });
        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const fieldBox =
    "flex items-center gap-3 h-[54px] w-full overflow-hidden rounded-xl px-4 py-2 border border-white/10 focus-within:border-yellow-300/40 transition-colors duration-200";
  const fieldStyle = { background: "rgba(255,255,255,0.05)" };
  const inputClass =
    "border-0 bg-transparent outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/30 text-sm";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {/* ── Section 1: Basic Info ── */}
        <div>
          <p className="text-yellow-300 text-[10px] tracking-widest uppercase font-bold mb-3 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" /> Assignment Info
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className={fieldBox} style={fieldStyle}>
                      <GraduationCap className="w-4 h-4 text-yellow-300/60 shrink-0" />
                      <Input
                        placeholder="Assignment title"
                        {...field}
                        className={inputClass}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs pl-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className={fieldBox} style={fieldStyle}>
                      <Tag className="w-4 h-4 text-yellow-300/60 shrink-0" />
                      <Dropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs pl-2" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ── Section 2: Description & Image ── */}
        <div>
          <p className="text-yellow-300 text-[10px] tracking-widest uppercase font-bold mb-3 flex items-center gap-2">
            📝 Description & Cover Image
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-52">
                    <Textarea
                      placeholder="Describe the assignment — objectives, requirements, expected output..."
                      {...field}
                      className="h-52 rounded-xl border border-white/10 focus:border-yellow-300/40 resize-none text-white placeholder:text-white/30 text-sm transition-colors duration-200"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs pl-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-52">
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs pl-2" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ── Section 3: Location ── */}
        <div>
          <p className="text-yellow-300 text-[10px] tracking-widest uppercase font-bold mb-3 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" /> Submission Location / Mode
          </p>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className={fieldBox} style={fieldStyle}>
                    <MapPin className="w-4 h-4 text-yellow-300/60 shrink-0" />
                    <Input
                      placeholder="e.g. Online / Classroom / Google Classroom"
                      {...field}
                      className={inputClass}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs pl-2" />
              </FormItem>
            )}
          />
        </div>

        {/* ── Section 4: Dates ── */}
        <div>
          <p className="text-yellow-300 text-[10px] tracking-widest uppercase font-bold mb-3 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" /> Assignment Dates
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className={fieldBox} style={fieldStyle}>
                      <Calendar className="w-4 h-4 text-yellow-300/60 shrink-0" />
                      <p className="whitespace-nowrap text-white/40 text-sm">
                        Assigned:
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="bg-transparent text-white text-sm outline-none w-full"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs pl-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className={fieldBox} style={fieldStyle}>
                      <Calendar className="w-4 h-4 text-red-400/60 shrink-0" />
                      <p className="whitespace-nowrap text-white/40 text-sm">
                        Deadline:
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="bg-transparent text-white text-sm outline-none w-full"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs pl-2" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ── Section 5: Marks & Resource Link ── */}
        <div>
          <p className="text-yellow-300 text-[10px] tracking-widest uppercase font-bold mb-3 flex items-center gap-2">
            🎯 Marks & Resource
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className={fieldBox} style={fieldStyle}>
                      <span className="text-yellow-300/60 text-sm font-bold shrink-0">
                        📊
                      </span>
                      <Input
                        type="number"
                        placeholder="Total marks (e.g. 100)"
                        {...field}
                        className={inputClass}
                      />
                      <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center gap-2 shrink-0">
                                <label
                                  htmlFor="isFree"
                                  className="whitespace-nowrap text-white/40 text-xs cursor-pointer"
                                >
                                  No marks
                                </label>
                                <Checkbox
                                  onCheckedChange={field.onChange}
                                  checked={field.value}
                                  id="isFree"
                                  className="h-4 w-4 border-2 border-yellow-300/40 data-[state=checked]:bg-yellow-300 data-[state=checked]:border-yellow-300"
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs pl-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className={fieldBox} style={fieldStyle}>
                      <Link2 className="w-4 h-4 text-yellow-300/60 shrink-0" />
                      <Input
                        placeholder="Reference / resource link (optional)"
                        {...field}
                        className={inputClass}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs pl-2" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ── Submit ── */}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full rounded-xl font-black text-black text-sm tracking-widest uppercase py-4 border-0 transition-all duration-300 hover:scale-[1.01] shadow-lg hover:shadow-yellow-300/20"
          style={{
            background: form.formState.isSubmitting
              ? "rgba(253,224,71,0.5)"
              : "#fde047"
          }}
        >
          {form.formState.isSubmitting
            ? "Publishing..."
            : type === "Create"
              ? "🚀 Publish Assignment"
              : "✏️ Update Assignment"}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
