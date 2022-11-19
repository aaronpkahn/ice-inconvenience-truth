import './style.css';

export const Slide = ( { children }) => {
    return (
        <div className="slide">
            {children}
        </div>
    )
}

export const SlideInner = ( { children } ) => {
    return (
        <div className="slide-inner">
            {children}
        </div>
    )
}



export default Slide;