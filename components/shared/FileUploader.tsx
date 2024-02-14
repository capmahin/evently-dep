type FileUpLoadProps = {
    imageUrl: string
    onFieldChange:(value:string)=> void
    setFiles: (files:any[])=> void
}

const FileUploader = ({ imageUrl, onFieldChange, setFiles }: FileUpLoadProps) => {
  return (
    <div>FileUploader</div>
  )
}

export default FileUploader