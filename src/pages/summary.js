import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import DataService from '../services/dataService';
import { connect } from 'react-redux';

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buriedEwws: [],
      aliveEww: "",
      birthDate: 0,
      name: null
    }
  }

  getEww = (uid) => {
    DataService.observeEww(uid, (eww) => {
      if (eww && eww.status === 'alive') { //comprobar status alive
        let { birth, name } = eww
        birth = new Date(birth.seconds * 1000)
        this.setState({birthDate: birth.toString(), name})
      }
    })
  }

  async componentDidMount() {
    const { userInfo } = this.props
    if (userInfo) {
      this.getEww(userInfo.uid)
    }

    const buriedEwws = await DataService.getAllUserEwws(userInfo.uid);
    if (buriedEwws) {
      this.setState({ buriedEwws });
    }
  }

  render() {
    const { buriedEwws } = this.state
    const { userInfo } = this.props
    const { birthDate, name } = this.state
    let arrayDate = birthDate.toString().split(' ').splice(0,5)
    let month = arrayDate[1]
    let num = arrayDate[2]
    let year = arrayDate[3]
    let hour = arrayDate[4]
    let orderedDate = [num, month, year]
    let finalDate = orderedDate.toString()

    return (
      <div id="summaryDiv">
        <Link id="return-summary" to="/user" >
          <div className="return-space">
            <button className="return-arrow-button" />
          </div>
        </Link>
        <h1 className ="summary-title">Datos del usuario</h1>
        <p>Nombre de usuario: {userInfo.name}</p>
        <p>Cuenta: {userInfo.email}</p>
        <h1 className ="summary-title">Eww actual</h1>
        <p>Nombre: {name}</p>
        {birthDate && 
          <React.Fragment>
            (
              <p>Nacimiento:</p>
              <p>{finalDate} a las {hour} </p>
            )
          </React.Fragment>
        }
        <h1 className ="summary-title">Ewws enterrados</h1>
        {buriedEwws.map(({id, name}) => {
            return (
              <p
                name={name}
                className="buriedEwws-list" 
                key={id}>
                {name}
              </p>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.user,
    eww: state.ewwDataReducer,
  }
}

export default connect(mapStateToProps)(Summary);
