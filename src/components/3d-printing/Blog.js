import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import HeaderBg from '../assests/header_bg.jpg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Blog.css';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 700,
  }
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

function createData(name, materials, applications, pros, cons) {
  return { name, materials, applications, pros, cons };
}

const rows = [
  createData('FDM', 'ABS, PLA, TPU rubber, PET, PETG, Nylon, PC', 'Engineering and industrial prototypes, presentation models, architectural models', 'Low cost technology; Easy operation; Strong parts', 'Rough surface finish; Slow printing speed;'),
  createData('SLA/DLP', 'Standard Resin, castable/wax resin, dental resin', 'Jewellery, art and craft, dental and medical sector', 'High Details in printing;Smooth surface finish;Medical grade printing', 'Material limitations; Post-processing required after prints'),
  createData('SLS', 'Nylon, Flexible rubber', 'Complex parts like automotive parts, prosthetic, etc', 'Supportless printing; High chemical and heat resistant', 'Expensive technology; High operational cost'),
]

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: HeaderBg,
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
              <FeaturedPost  />
          </Grid>
        </main>

        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">3D Printing Technology</StyledTableCell>
            <StyledTableCell align="center">Materials</StyledTableCell>
            <StyledTableCell align="center">Applications</StyledTableCell>
            <StyledTableCell align="center">Pros</StyledTableCell>
            <StyledTableCell align="center">Cons</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.materials}</StyledTableCell>
              <StyledTableCell align="center">{row.applications}</StyledTableCell>
              <StyledTableCell align="center">{row.pros}</StyledTableCell>
              <StyledTableCell align="center">{row.cons}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


      </Container>
    </React.Fragment>
  );
}
