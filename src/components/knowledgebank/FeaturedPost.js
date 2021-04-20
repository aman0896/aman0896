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
    const { description } = props;

    return (
        <Grid item xs={12} md={12}>
            <CardActionArea component="p">
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>{description}</CardContent>
                    </div>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.object,
};
