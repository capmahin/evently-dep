import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import {
  createCategory,
  getAllCategories
} from "@/lib/actions/category.actions";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    createCategory({ categoryName: newCategory.trim() }).then((category) => {
      setCategories((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      {/* Trigger */}
      <SelectTrigger className="w-full border-0 bg-transparent text-white/60 text-sm focus:ring-0 focus:ring-offset-0 outline-none">
        <SelectValue placeholder="Select subject / category" />
      </SelectTrigger>

      {/* Dropdown Content */}
      <SelectContent
        className="rounded-xl border border-yellow-300/20 shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
        }}
      >
        {/* Header */}
        <div className="px-3 py-2 border-b border-white/5">
          <p className="text-yellow-300 text-[10px] tracking-widest uppercase font-bold">
            📚 Subject / Category
          </p>
        </div>

        {/* Category list */}
        {categories.length > 0 ? (
          categories.map((category) => (
            <SelectItem
              key={category._id.toString()}
              value={category._id.toString()}
              className="text-white/70 text-sm hover:text-white focus:text-white focus:bg-yellow-300/10 cursor-pointer py-2.5 px-3"
            >
              <span className="flex items-center gap-2">
                <span className="text-yellow-300/50 text-xs">▸</span>
                {category.name}
              </span>
            </SelectItem>
          ))
        ) : (
          <div className="px-3 py-4 text-center text-white/30 text-xs">
            No categories yet — add one below
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-2 my-1" />

        {/* Add new category */}
        <AlertDialog>
          <AlertDialogTrigger className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-yellow-300/70 hover:text-yellow-300 hover:bg-yellow-300/5 transition-colors duration-200 rounded-lg">
            <span className="text-base leading-none">＋</span>
            <span className="text-xs font-semibold tracking-wide">
              Add new subject
            </span>
          </AlertDialogTrigger>

          <AlertDialogContent
            className="rounded-2xl border border-yellow-300/20 shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
            }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-yellow-300/0 via-yellow-300 to-yellow-300/0" />

            <AlertDialogHeader>
              <AlertDialogTitle className="text-white font-black text-lg tracking-tight flex items-center gap-2">
                <span className="text-xl">📚</span> New Subject / Category
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/40 text-sm">
                Add a new subject that teachers can use when posting
                assignments.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* Input */}
            <div className="mt-1">
              <p className="text-yellow-300 text-[10px] tracking-widest uppercase font-bold mb-2">
                Subject Name
              </p>
              <div
                className="flex items-center gap-3 h-[46px] w-full overflow-hidden rounded-xl px-4 border border-white/10 focus-within:border-yellow-300/40 transition-colors duration-200"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <span className="text-yellow-300/50 text-sm">🏷️</span>
                <Input
                  type="text"
                  placeholder="e.g. Mathematics, Physics, CSE..."
                  className="border-0 bg-transparent text-white placeholder:text-white/30 text-sm outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
            </div>

            <AlertDialogFooter className="mt-2 gap-2">
              <AlertDialogCancel className="rounded-xl border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
                className="rounded-xl font-black text-black text-sm border-0 px-6 transition-all duration-200 hover:scale-105"
                style={{ background: "#fde047" }}
              >
                ＋ Add Subject
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
