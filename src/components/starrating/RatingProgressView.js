const RatingProgressView = (props) => {
    const { completed } = props;

    const containerStyles = {
        height: 15,
        width: '100%',
        backgroundColor: '#e0e0de',
        borderRadius: '3px',
    };

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: 'green',
        borderRadius: 'inherit',
    };

    return (
        <div style={containerStyles}>
            <div style={fillerStyles} />
        </div>
    );
};

export default RatingProgressView;
