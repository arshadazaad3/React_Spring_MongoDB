import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from 'axios';

import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    top:100,  
    flexDirection: "column",
    alignItems: "center",
    justifyContent:'center',
    alignSelf:'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    marginBottom: 10
  },
  card: {
    minWidth: '400',
    justifyContent: 'left'
  },
  textfieldInput: {
    marginBottom: 10
  }
}));

export default function ReactSpring() {
  const classes = useStyles();
  const [firstLoad, setLoad] = React.useState(true);


  const [email, setemail] = React.useState("");
  const [name, setName] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const [alert, setAlert] = React.useState(false);

  const handleEmailChange = event => setemail(event.target.value);
  const handleNameChange = event => setName(event.target.value);
  const handleBodyChange = event => setBody(event.target.value);
  const handleSubjectChange = event => setSubject(event.target.value);

  const handleSubmit = (e) => {
    if (email === "") {
      alert("Email cannot be empty")
    }
    else {
      axios.post('http://localhost:8080/formdetails?email=' + email + '&name=' + name + '&subject=' + subject + '&body=' + body)
        .then(res => {
          console.log(res)
        });
      setemail("")
      setBody("")
      setName("")
      setSubject("")
      setAlert(true);
    }
  };


  if (firstLoad) {
    setLoad(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{textAlign:'center'}}>
          React Spring Email Sender and Database Intergration
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                className={classes.textfieldInput}
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                value={email}
                id="email"
                label="email"
                onChange={handleEmailChange}
              />
              <TextField
                className={classes.textfieldInput}

                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                value={name}
                id="name"
                label="name"
                onChange={handleNameChange}
              />
              <TextField
                className={classes.textfieldInput}
                autoComplete="subject"
                name="subject"
                variant="outlined"
                required
                fullWidth
                value={subject}
                id="subject"
                label="subject"
                onChange={handleSubjectChange}
              />
              <TextField
                className={classes.textfieldInput}

                autoComplete="message"
                name="message"
                variant="outlined"
                required
                fullWidth
                value={body}
                id="message"
                label="message"
                onChange={handleBodyChange}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => handleSubmit(e)}
          >
            Send Email
          </Button>
        </form>
      </div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={alert}
          autoHideDuration={3000}
          onClose={() => { setAlert(false) }}
          message="Email Sent"

        />

      </div>
    </Container>
  );
}
