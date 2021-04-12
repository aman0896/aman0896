import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import './Blog.css';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="p">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <p>3D Printing, also termed as an additive manufacturing is the process of making physical objects/products through layer wise addition of melted material directly from the computer aided 3D designs.</p>
              <p>
              There is no necessity of investing in additional tools or die/mold in the 3D printing manufacturing process. A desired product is first modelled in a 3D CAD software, exported in acceptable file formats (usually .obj, .stl) and sent to a 3D printing slicer software which converts design into machine supported codes and a 3D printer makes the product in real physical form.
              </p>
              <p>
              Most popular 3D printing technologies are the FDM 3D printers (Plastic/rubber filament as raw material), SLA/DLP 3D printers (liquid resins as raw material and laser/light source for binding layers) and SLS 3D Printer technologies (polymer or metal power as raw material and laser source).
              </p>
            </CardContent>
          </div>
          {/* <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          </Hidden> */}
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
