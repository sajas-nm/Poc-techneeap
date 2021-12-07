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
export default function DepartmentModal({setModal, isModal, currentData,setCurrentData}) {
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
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            currentData?.id
                ? dispatch(
                      updateDepartment(values, currentData.id, () => {
                          handleClose();
                          dispatch(getAllDepartments());
                          setCurrentData({})
                          formik.resetForm();
                      }),
                  )
                : dispatch(
                      createDepartment(values, () => {
                          handleClose();
                          dispatch(getAllDepartments());
                          setCurrentData({})
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

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={isModal}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {currentData?.id
                        ? 'Update Department'
                        : 'Create Department'}
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
