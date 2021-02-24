import React from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
  GridColumn,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import md5 from 'md5';

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
  };
  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message} </p>);

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };
  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  handlechange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      event.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user.updateProfile({
              displayName:this.state.username,
              photoURL:`http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
          })
          .then(()=>{
  this.saveUser(createdUser).then(()=>{
      console.log('user saved');
      this.setState({loading:false});
  })
          })
          .catch(err=>{
              console.error(err);
              this.setState({errors:this.state.errors.concat(err),loading:false});
          })
        
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  saveUser=createdUser=>{
return this.state.usersRef.child(createdUser.user.uid).set({
    name:createdUser.user.displayName,
    avatar:createdUser.user.photoURL
});
  }

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading,
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <GridColumn style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for Devchat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handlechange}
                value={username}
                className={
                  errors.some((error) =>
                    error.message.toLowerCase().includes("username")
                  )
                    ? "error"
                    : ""
                }
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handlechange}
                value={email}
                className={
                    errors.some((error) =>
                      error.message.toLowerCase().includes("email")
                    )
                      ? "error"
                      : ""
                  }
                type="email"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handlechange}
                value={password}
                className={
                    errors.some((error) =>
                      error.message.toLowerCase().includes("password")
                    )
                      ? "error"
                      : ""
                  }
                type="password"
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm Password"
                onChange={this.handlechange}
                value={passwordConfirmation}
                className={
                    errors.some((error) =>
                      error.message.toLowerCase().includes("password")
                    )
                      ? "error"
                      : ""
                  }
                type="password"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
                fluid
                size="large"
              >
                Register
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </message>
          )}

          <Message>
            Already a user?<Link to="/login">Login</Link>
          </Message>
        </GridColumn>
      </Grid>
    );
  }
}
export default Register;
