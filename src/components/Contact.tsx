import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {addAddress,addPhoneNo, addEmail} from '../Redux/Slice';

let ContactSchema = Yup.object().shape({
  email: Yup.string().required('This field is required.') .email('Invalid email address'),
  phoneno: Yup.string().required('This field is required.').max(11, 'Must be valid phone number'),
  address: Yup.string()
      .required('This field is required.')
});
const useStyles = makeStyles(theme => ({
  '@global': {
      body: {
          backgroundColor: theme.palette.common.white,
      },
  },
  paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
  },
  form: {
      width: '100%',
      marginTop: theme.spacing(3),
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
  },
}));

interface Props {
  handleNext: () => void
}

const Contact: React.FC<Props> = ({ handleNext }) => {
  const dispatch = useDispatch();
 const classes = useStyles();

 return (
     <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
             <Typography component="h1" variant="h5">
                 Contact Data
             </Typography>
             <Formik
                 initialValues={{
                     phoneno: "",
                     email: "",
                     father: "",
                     address: ""
                 }}
                 validationSchema={ContactSchema}
                 onSubmit={values => {
                     // console.log(values);
                     dispatch(addPhoneNo(values.phoneno));
                     dispatch(addEmail(values.email));
                     dispatch(addAddress(values.address));
                     handleNext();
                 }}
             >
                 {({ errors, handleChange, touched }) => (
                     <Form className={classes.form}>
                         <Grid container spacing={2}>
                             <Grid item xs={12}>
                                 <TextField
                                     // error={errors.phoneno && touched.phoneno}
                                     autoComplete="pnumber"
                                     name="phoneno"
                                     variant="outlined"
                                     fullWidth
                                     type="number"
                                     onChange={handleChange}
                                     id="phoneno"
                                     label="Phone Number"
                                     autoFocus
                                     helperText={
                                        <span style={{color:'red'}}> {errors.phoneno && touched.phoneno
                                             ? errors.phoneno
                                             : null}</span>
                                     }
                                 />
                             </Grid>
                             <Grid item xs={12} >
                                 <TextField
                                     // error={errors.email && touched.email}
                                     variant="outlined"
                                     fullWidth
                                     onChange={handleChange}
                                     id="email"
                                     label="Email"
                                     name="email"
                                     autoComplete="email"
                                     helperText={
                                         <span style={{color:'red'}}>{
                                         errors.email && touched.email
                                             ? errors.email
                                             : null}
                                             </span>
                                     }
                                 />
                             </Grid>

                             <Grid item xs={12}>
                                 <TextField
                                     // error={errors.password && touched.password}
                                     variant="outlined"
                                     fullWidth
                                     onChange={handleChange}
                                     name="address"
                                     label="Address"
                                     type="text"
                                     id="address"
                                     autoComplete="address"
                                     helperText={
                                         <span style={{color:'red'}}>
                                         {errors.address && touched.address
                                             ? errors.address
                                             : null}
                                             </span>
                                     }
                                 />
                             </Grid>
                         </Grid>
                         <Button
                             type="submit"
                             fullWidth
                             variant="contained"
                             color="primary"
                             className={classes.submit}
                         >
                             Next
                     </Button>
                     </Form>

                 )}
             </Formik>
         </div>
     </Container>
 );
};
export default Contact;