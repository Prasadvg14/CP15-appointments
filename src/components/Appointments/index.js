import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isActiveStarred: false}

  onSubmitForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      title: '',
      date: '',
      appointmentsList: [...prevState.appointmentsList, newAppointment],
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  toggleStarredFilter = () => {
    this.setState(prevState => ({
      isActiveStarred: !prevState.isActiveStarred,
    }))
  }

  filterStarredList = () => {
    const {appointmentsList} = this.state
    const filteredList = appointmentsList.filter(each => {
      if (each.isStarred !== true) {
        return ''
      }
      return each
    })
    return filteredList
  }

  render() {
    const {title, date, appointmentsList, isActiveStarred} = this.state
    const starredBtn = isActiveStarred ? 'active' : 'notActive'
    const filteredList = isActiveStarred
      ? this.filterStarredList()
      : appointmentsList

    return (
      <div className="bg-container">
        <div className="card">
          <div className="top">
            <div>
              <h1>Add Appointment</h1>
              <form onSubmit={this.onSubmitForm}>
                <label htmlFor="title">TITLE</label>
                <input id="title" onChange={this.onChangeTitle} value={title} />
                <label htmlFor="date">DATE</label>
                <input
                  type="date"
                  id="date"
                  onChange={this.onChangeDate}
                  value={date}
                />
                <button type="submit" className="addBtn">
                  Add
                </button>
              </form>
            </div>
            <img
              className="apImg"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>

          <div className="bottom">
            <div className="bottomNav">
              <h2>Appointments</h2>
              <button
                onClick={this.toggleStarredFilter}
                type="button"
                className={starredBtn}
                value={isActiveStarred}
              >
                Starred
              </button>
            </div>
            <ul>
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  toggleIsStarred={this.toggleIsStarred}
                  eachAppointment={eachAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
