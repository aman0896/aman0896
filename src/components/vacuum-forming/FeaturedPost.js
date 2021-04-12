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
              <p>Vacuum forming is a digital manufacturing process which involves heating specific sheets of plastic to required forming temperature and stretching and pulling them onto the surface of the mold placed in the bed using vacuum suction. Forming involves shaping plastic to that of the mold. Vacuum forming is the simple type of plastic thermoforming that uses vacuum pressure to get the required parts mold with desired details and geometry.</p>
              <p>
              It uses a portal in the home vacuum machine for creating suction under the bed. When the plastic sheet is heated the sheet is pulled down stretching over the mold above the bed. The suction starts pulling the sheets and forming the desired shape in the sheet.
              </p>
              <p>
              The templates used for vacuum forming are usually 3D printed parts or real life products. The thing to consider is that the material packing of these templates needs to be tight.
              </p>
              <p>The major applications are the: prototyping industries, product packaging, chocolate dies, Medical packaging: pharmaceutical trays pills are packaged: MRI and CT machine exterior pieces.</p>
              <p>Compatible materials for forming: Thermoplastic Sheets (Clear Sheet, Resin Sheets, Form Sheets and Cast Sheets)</p>
              <p>Materials for Casting in the mount: Plaster of Paris, Resin, Jesmonite, Concrete, Chocolate, Silicone, Wax.</p>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
