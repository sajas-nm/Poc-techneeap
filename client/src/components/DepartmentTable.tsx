import React, {useState, useEffect} from 'react';
import {
    makeStyles,
    useTheme,
    Theme,
    createStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import {useDispatch, useSelector} from 'react-redux';
import {getAllDepartments, deleteDepartment} from '../action';
import {IDepartmentState} from '../reducers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import {TransitionProps} from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {children?: React.ReactElement<any, any>},
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

interface Column {
    id: 'name' | 'id';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    {id: 'id', label: 'DepartmentId', minWidth: 100},
    {id: 'name', label: 'Name', minWidth: 470},
];

export default function DepartmentTable({handleEdit}) {
    const state: any = useSelector<
        IDepartmentState,
        IDepartmentState['departments']
    >((state) => state.departments);
    const dispatch = useDispatch();
    console.log('state', state);
    const {departments, loading, isCreateOrUpdate} = state;
    useEffect(() => {
        dispatch(getAllDepartments());
    }, [dispatch]);

    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        console.log('newPage', newPage);
        setPage(newPage)
        dispatch(
            getAllDepartments({
                searchQuery: '',
                page: newPage,
                pageSize: 10,
            }),
        );
    };

    const [deleteId, setDeleteId] = useState('');

    const handleClose = () => {
        setDeleteId('');
    };

    const handleDelete = (id) => {
        setDeleteId(id);
    };

    return (
        <>
            {loading && <LinearProgress />}
            <TableContainer component={Paper} >
                <Table
                    className={classes.table}
                    aria-label=" pagination table "
                    stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}>
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody >
                       
                        {departments?.rows?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    style={{width: 30}}>
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    <IconButton
                                        onClick={() => handleEdit(row)}
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span">
                                        <EditOutlined />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(row.id)}
                                        color="secondary"
                                        aria-label="upload picture"
                                        component="span">
                                        <DeleteOutline />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {/* {departments?.rows?.length > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * departments?.rows?.length,
                                }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )} */}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5]}
                                colSpan={3}
                                count={departments.count}
                                rowsPerPage={5}
                                page={page}
                                SelectProps={{
                                    inputProps: {'aria-label': 'rows per page'},
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Dialog
                open={deleteId ? true : false}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this department ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() =>
                            dispatch(
                                deleteDepartment(deleteId, () => {
                                    dispatch(getAllDepartments());
                                    handleClose();
                                }),
                            )
                        }
                        color="secondary">
                        {isCreateOrUpdate ? (
                            <CircularProgress size={20} />
                        ) : null}
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
