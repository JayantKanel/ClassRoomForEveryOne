import './choice.css';
import React, { useState} from "react";
import { useForm} from "react-hook-form";
import { useHistory } from "react-router-dom";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Jayant Kanel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
function Choice() {
  const history = useHistory();
  const classes = useStyles();
  const [val, setVal] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const {handleSubmit} = useForm({
    // defaultValues: { ...initialValues },
    mode: "onChange",
  });
  const onSubmit = async () => {
    
    if (val === "Student") {
      history.push('/studentsignup');
    } else if(val==="Teacher") {
      history.push("/teachersignup");
    }
    else{
      
    }
  };
  return (
    <>
      <div mt={5}>
      <Box mt={5} align="center">
      <FormControl className={classes.formControl} onSubmit={handleSubmit(onSubmit)}>
        <InputLabel id="demo-controlled-open-select-label">Select Option</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={val}
          onChange={handleChange}
          
        >
          <MenuItem value="" >
            <em> --Select Option--</em>
          </MenuItem>
          <MenuItem value={"Student"}>Student</MenuItem>
          <MenuItem value={"Teacher"}>Teacher</MenuItem>
        </Select>
        <button type="submit" className="btn btn-primary col-md-12 up" onClick={handleSubmit(onSubmit)}>
              Continue
            </button>
      </FormControl>
      </Box>
    </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </>
  );
}
export default Choice;
