import { Navigate } from 'react-router-dom'
import { Path } from 'src/contants/path'

export default function NoMatchUser() {
  return <Navigate to={Path.profile} />
}
