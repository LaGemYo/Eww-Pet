import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import DataService from '../services/dataService';
import { connect } from 'react-redux';
import StorageService from '../services/storageService';

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buriedEwws: [],
      aliveEww: "",
      birthDate: 0,
      name: null,
      photo: null,
    }
  }


  uploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      StorageService.uploadFile(file, "photo-user", imageUrl => {
        DataService.updateDetail('users', this.props.userInfo.uid, { photo: imageUrl });
        this.setState({ photo: imageUrl })
      })
    }
  }

  getEww = (uid) => {
    DataService.observeEww(uid, (eww) => {
      if (eww && eww.status === 'alive') { //compeobar status alive
        let { birth, name } = eww
        birth = new Date(birth.seconds * 1000)
        this.setState({ birthDate: birth.toString(), name })
      }
    })
  }

  async componentDidMount() {
    
    const { userInfo } = this.props
    DataService.getObjectDetail("users", userInfo.uid)
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
<<<<<<< HEAD
    const { birthDate, name } = this.state
    let arrayDate = birthDate.toString().split(' ').splice(0,5)
    let day =  arrayDate[0]
    let month = arrayDate[1]
    let num = arrayDate[2]
    let year = arrayDate[3]
    let hour = arrayDate[4]

    let orderedDate = [num, month, year]
    let finalDate = orderedDate.toString()

=======
    const { birthDate, name, photo } = this.state
>>>>>>> e34fa9c806e2a02e9d31dcf493ee60359d9d5950
    return (
      <div id="summaryDiv">
        <Link id="return-summary" to="/user" >
          <div className="return-space">
            <button className="return-arrow-button" />
          </div>
        </Link>
        <h1 className="summary-title">Datos del usuario</h1>
        <div className="user-photo">
          {photo && <img className="photo-user" src={photo} alt="usuario"></img>}
        </div>
        <input style={{ display: photo ? "none" : "block" } }  className="input-photo" type="file" onChange={this.cargarFoto} />
        <label id="label-photo" htmlFor="photo">Subir foto</label>
        <p>Nombre de usuario: {userInfo.name}</p>
        <p>Cuenta: {userInfo.email}</p>
        <h1 className="summary-title">Eww actual</h1>
        <p>Nombre: {name}</p>
        {birthDate &&
          <React.Fragment>
            (
              <p>Nacimiento:</p>
<<<<<<< HEAD
              <p>{finalDate} a las {hour} </p>
=======
            <p>{birthDate}</p>
>>>>>>> e34fa9c806e2a02e9d31dcf493ee60359d9d5950
            )
          </React.Fragment>
        }
        <h1 className="summary-title">Ewws enterrados</h1>
        {buriedEwws.map(({ id, name }) => {
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

