interface messageProps {
  type: string
  message: string
}

const Message = ({ type, message }: messageProps) => {
  return <p className={type}>{message}</p>
}
export default Message
