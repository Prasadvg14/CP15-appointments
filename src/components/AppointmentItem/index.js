import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleIsStarred} = props
  const {title, date, id, isStarred} = eachAppointment
  const time = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  const star = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li>
      <div className="appointment">
        <div className="header">
          <p>{title}</p>
          <button data-testid="star" type="button" onClick={onClickStar}>
            <img src={star} alt="starred" />
          </button>
        </div>
        <p>{time}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
