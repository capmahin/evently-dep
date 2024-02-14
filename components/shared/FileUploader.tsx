import { Dispatch, SetStateAction } from "react"

type FileUpLoadProps = {
    onFieldChange: (url: string) => void
    imageUrl: string
    setFiles: Dispatch<SetStateAction<File[]>>
}

const FileUploader = ({ imageUrl, onFieldChange, setFiles }: FileUpLoadProps) => {
  return (
    <div>FileUploader</div>
  )
}

export default FileUploader