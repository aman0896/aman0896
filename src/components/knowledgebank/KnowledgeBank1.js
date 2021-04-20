import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Blog.css';
import './KnowledgeBank.css';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import { ThreeDPrinting, VacumForming } from './data';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 700,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function KnowledgeBank1() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <div>
                    <div id="3D-Printing" style={{ marginTop: '30px' }}>
                        <MainFeaturedPost
                            image={ThreeDPrinting.image}
                            title="3D Printing"
                        />
                        <Grid container spacing={4}>
                            <FeaturedPost
                                description={ThreeDPrinting.description}
                            />
                        </Grid>

                        {ThreeDPrinting.rows && (
                            <TableContainer component={Paper}>
                                <Table
                                    className={classes.table}
                                    aria-label="customized table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            {ThreeDPrinting.tableHead.map(
                                                (item, index) => (
                                                    <StyledTableCell
                                                        key={index}
                                                        align="center"
                                                    >
                                                        {item}
                                                    </StyledTableCell>
                                                )
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ThreeDPrinting.rows.map((row) => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell
                                                    component="th"
                                                    scope="row"
                                                    align="center"
                                                >
                                                    {row.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {row.materials}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {row.applications}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {row.pros}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {row.cons}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </div>
                    <div id="Vaccume-Forming" style={{ marginTop: '30px' }}>
                        <MainFeaturedPost
                            image={VacumForming.image}
                            title="Vaccume Forming"
                        />
                        <Grid container spacing={4}>
                            <FeaturedPost
                                description={VacumForming.description}
                            />
                        </Grid>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}
