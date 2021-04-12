import React, { Component, useState } from 'react';
import Ratings from 'react-ratings-declarative';
import './StarRating.css';
import RatingProgressView from './RatingProgressView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDivide, faUser } from '@fortawesome/free-solid-svg-icons';

var ratings = [];
export default function StarRating({
    widgetDimensions,
    widgetSpacing,
    setAverageRating,
    setTotalRatings,
    overallRatingArray,
}) {
    const [rating, setRating] = useState(0);
    // const [averageRating, setAverageRating] = useState();
    // const [totalFeedback, setTotalFeedback] = useState();
    // var [arr, setArr] = useState([0, 0, 0, 0, 0]);

    const ChangeRating = (newRating) => {
        ratings.push(newRating);
        var totalRating = ratings.length;
        setAverageRating(
            ratings.reduce((a, v) => (a = a + v), 0) / totalRating
        ); // a is new value, v is the value of array
        setRating(newRating);
        setTotalRatings(totalRating);
        overallRatingArray(ratings);
    };

    return (
        <>
            <div>
                <Ratings
                    rating={rating}
                    widgetRatedColors="#0062cc"
                    widgetDimensions={widgetDimensions}
                    widgetSpacings={widgetSpacing}
                    changeRating={ChangeRating}
                >
                    <Ratings.Widget widgetHoverColor="goldenrod" />
                    <Ratings.Widget widgetHoverColor="goldenrod" />
                    <Ratings.Widget widgetHoverColor="goldenrod" />
                    <Ratings.Widget widgetHoverColor="goldenrod" />
                    <Ratings.Widget widgetHoverColor="goldenrod" />
                </Ratings>
            </div>
        </>
    );
}

export function StarRatingAverage({ averageRating, widgetDimensions }) {
    return (
        <div>
            <Ratings
                rating={averageRating}
                widgetRatedColors="goldenrod"
                widgetDimensions={widgetDimensions}
                widgetSpacings="4px"
            >
                <Ratings.Widget widgetHoverColor="goldenrod" />
                <Ratings.Widget widgetHoverColor="goldenrod" />
                <Ratings.Widget widgetHoverColor="goldenrod" />
                <Ratings.Widget widgetHoverColor="goldenrod" />
                <Ratings.Widget widgetHoverColor="goldenrod" />
            </Ratings>
        </div>
    );
}

export function AverageRatingNum({ averageRating }) {
    const averageRatingRoundOff = (
        Math.round(averageRating * 100) / 100
    ).toFixed(1);
    return <div>{averageRatingRoundOff}</div>;
}

export function TotalRatings({ totalRatings }) {
    const CommaSeperate = (x) => {
        if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    return (
        <div>
            <FontAwesomeIcon className="mr-1" icon={faUser} size="sm" />
            {CommaSeperate(totalRatings)} total
        </div>
    );
}

export function OverallRatings({ overallRatingArray, totalRatings }) {
    var arr = [0, 0, 0, 0, 0];

    if (overallRatingArray) {
        for (let i = 0; i < overallRatingArray.length; i++) {
            arr[overallRatingArray[i] - 1] += 1;
        }
    }
    arr = arr.reverse();
    return (
        <div>
            {arr.map((item, index) => (
                <div
                    className="row m-1 d-flex align-items-center justify-content-end"
                    key={index}
                >
                    <div
                        className="col-1 mr-1 p-0"
                        style={{
                            textAlign: 'end',
                            fontWeight: 'bold',
                        }}
                    >
                        {arr.length - index}
                    </div>
                    <div className="col p-0">
                        <RatingProgressView
                            completed={(item / totalRatings) * 100}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
