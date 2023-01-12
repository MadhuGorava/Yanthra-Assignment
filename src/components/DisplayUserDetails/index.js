import {formatDistanceToNow} from 'date-fns'
import {MdDeleteOutline} from 'react-icons/md'
import {FiEdit} from 'react-icons/fi'

import './index.css'

const DisplayUserDetails = props => {
  const {userDetails} = props
  const {id, username, email, phoneNumber, initialClassName, date} = userDetails
  const initial = username ? username[0].toUpperCase() : ''

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }
  const postedTime = formatDistanceToNow(date)

  return (
    <li className="account-item">
      <div className="account-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{username}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="email">{email}</p>
          <p className="number">{phoneNumber}</p>
        </div>
      </div>
      <div className="buttons-container">
        <button
          className="button"
          type="button"
          onClick={onDeleteComment}
          testid="delete"
        >
          {' '}
          <MdDeleteOutline />{' '}
        </button>
        <button
          className="button"
          type="button"
          onClick={onDeleteComment}
          testid="edit"
        >
          {' '}
          <FiEdit />{' '}
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default DisplayUserDetails
