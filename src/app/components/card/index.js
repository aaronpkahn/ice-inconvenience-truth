import './style.css';

function Card( props ) {

    const {
        children, 
        className = "",
    } = props;

    return (
        <div className={`card ${className}`} {...props} >
            {children}
        </div>
    )
}

export default Card;