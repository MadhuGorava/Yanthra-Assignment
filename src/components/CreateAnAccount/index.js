import {Component} from 'react'
import DisplayUserDetails from '../DisplayUserDetails'
import './index.css'

class CreateAnAccount extends Component {
  state = {
    username: '',
    email: '',
    phoneNumber: '',
    showSubmitError: false,
    errorMsg1: '',
    errorMsg2: '',
    errorMsg3: '',
    userList: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({phoneNumber: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state
    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL ADDRESS
        </label>
        <input
          type="text"
          id="email"
          className="input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Email Address"
        />
      </>
    )
  }

  renderPhoneNumberField = () => {
    const {phoneNumber} = this.state
    return (
      <>
        <label className="input-label" htmlFor="number">
          PHONE NUMBER
        </label>
        <input
          type="text"
          id="number"
          className="input-field"
          value={phoneNumber}
          onChange={this.onChangePassword}
          placeholder="Phone Number"
        />
      </>
    )
  }

  onCreateAnAccount = event => {
    event.preventDefault()
    const {username, email, phoneNumber} = this.state
    const newUserList = [
      {
        username: '',
        email: '',
        phoneNumber: '',
      },
    ]

    if (username === '') {
      this.setState({
        showSubmitError: true,
        errorMsg1: 'Please Fill Username Field',
      })
    }
    if (email === '') {
      this.setState({
        showSubmitError: true,
        errorMsg2: 'Please Fill Email Field',
      })
    }
    if (phoneNumber === '') {
      this.setState({
        showSubmitError: true,
        errorMsg3: 'Please Fill Password Field',
      })
    }

    if (username !== '' && email !== '' && phoneNumber !== '') {
      const formData = {username, email, phoneNumber}
      this.setState(prevState => ({...prevState.userList, newUserList}))

      const url = 'https://apis.ccbp.in/users'
      function submitFormData(formData) {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization:
              'Bearer 00f3f8fde06120db02b587cc372c3d85510896e899b45774068bb750462acd9f',
          },
          body: JSON.stringify(formData),
        }

        fetch(url, options)
          .then(function (response) {
            return response.json()
          })
          .then(function (jsonData) {
            console.log(jsonData)
            if (jsonData.code === 422) {
              if (jsonData.data[0].message === 'has already been taken') {
                this.setState({errorMsg2: 'Email Already Exists'})
              }
            }
          })
      }
    }
  }

  render() {
    const {
      showSubmitError,
      errorMsg1,
      errorMsg2,
      errorMsg3,
      userList,
    } = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          {showSubmitError && <p className="error-message">{errorMsg1}</p>}
          <div className="input-container">{this.renderEmailField()}</div>
          {showSubmitError && <p className="error-message">{errorMsg2}</p>}
          <div className="input-container">{this.renderPhoneNumberField()}</div>
          {showSubmitError && <p className="error-message">{errorMsg3}</p>}

          <button
            type="submit"
            className="login-button"
            onClick={this.onCreateAnAccount}
          >
            CREATE ACCOUNT
          </button>
        </form>
        <div>
          {userList.map(item => (
            <DisplayUserDetails key={item.id} userDetails={item} />
          ))}
        </div>
      </div>
    )
  }
}

export default CreateAnAccount
