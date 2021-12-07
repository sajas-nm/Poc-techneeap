import React, {useEffect, useRef} from 'react';
import {
    createStyles,
    Theme,
    withStyles,
    WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {toast} from 'react-toastify';
import {useFormik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {createDepartment, getAllDepartments, updateDepartment} from '../action';
import {IDepartmentState} from '../reducers';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    Avatar,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
        width: 500,
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

//@ts-ignore
const validationSchema = yup.object({
    name: yup.string().min(4).required('name is required'),
});
export default function EmployeeModal({
    setModal,
    isModal,
    currentData,
    setCurrentData,
}) {
    const dispatch = useDispatch();
    const state: any = useSelector<
        IDepartmentState,
        IDepartmentState['departments']
    >((state) => state.departments);

    const {isCreateOrUpdate} = state;

    const handleClose = () => {
        setModal(false);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            dob: '',
            profilePicUrl: '',
            departmentId: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            currentData?.id
                ? dispatch(
                      updateDepartment(values, currentData.id, () => {
                          handleClose();
                          dispatch(getAllDepartments());
                          setCurrentData({});
                          formik.resetForm();
                      }),
                  )
                : dispatch(
                      createDepartment(values, () => {
                          handleClose();
                          dispatch(getAllDepartments());
                          setCurrentData({});
                          formik.resetForm();
                      }),
                  );
        },
    });

    useEffect(() => {
        if (currentData?.id) {
            formik.setFieldValue('name', currentData.name);
        }
    }, [currentData]);

    const onUploade = (event) => {
        console.log('event',event)
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        
        // var formdata = new FormData();
        // formdata.append("picture", event.target.files[0],event.target.value);
        
        // var requestOptions = {
        //   method: 'POST',
        //   headers: myHeaders,
        //   body: formdata,
        //   redirect: 'follow'
        // };
        
        // fetch("http://localhost:5000/api/uploade", requestOptions)
        //   .then(response => response.text())
        //   .then(result => console.log(result))
        //   .catch(error => console.log('error', error));;
    };

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={isModal}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {currentData?.id ? 'Update Employee' : 'Create Employee'}
                </DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <>
                        <DialogContent dividers>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.name &&
                                    Boolean(formik.errors.name)
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
                                }
                            />
                            <br />
                            <br />
                            <TextField
                                id="dob"
                                label="Date of Birth"
                                type="date"
                                // defaultValue="2017-05-24"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{width: '100%'}}
                                value={formik.values.dob}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.dob &&
                                    Boolean(formik.errors.dob)
                                }
                                helperText={
                                    formik.touched.dob && formik.errors.dob
                                }
                            />
                            <br />
                            <br />
                            <FormControl style={{width: '100%'}}>
                                <InputLabel id="demo-simple-select-label">
                                    Department
                                </InputLabel>
                                <Select
                                    label="Date of Birth"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <br />
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                            />

                            <TextField
                                id="picture"
                                name="picture"
                                label="Profile Pic"
                                type="file"
                                // defaultValue="2017-05-24"
                                // InputLabelProps={{
                                //     shrink: true,
                                // }}
                                style={{width: '100%'}}
                                onChange={onUploade}
                            />
                            <br />
                            <br />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit">
                                {isCreateOrUpdate ? (
                                    <CircularProgress size={25} />
                                ) : null}
                                {currentData?.id ? 'Update' : 'Create'}
                                {/* isCreateOrUpdate */}
                            </Button>
                        </DialogActions>
                    </>
                </form>
            </Dialog>
        </div>
    );
}
