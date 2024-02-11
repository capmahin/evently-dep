import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

type DropdownProps={
    value?: string
    onChangeHandler?: ()=> void
}

const Dropdown = ({value, onChangeHandler}: DropdownProps) => {
  return (
    <div>Dropdown</div>
  )
}

export default Dropdown