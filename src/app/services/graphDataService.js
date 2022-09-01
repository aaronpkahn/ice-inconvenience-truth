
/**
 * Find and return the maximum data peaks in a set of (x,y) coordinates
 * 
 * @param {Array} arr 
 */
export const getMaxPoints = ( arr ) => {
    return arr.reduce( (prev, current, index) => {
        return (
            index > 0 &&
            index < arr.length -1 && 
            current.y > arr[index-1].y &&
            current.y > arr[index+1].y
        ) ? [ ...prev, current ] : prev;
    }, [] );
}

/**
 * Find and return the highest and lowest points in a collection 
 * of (x,y) coordinates
 * 
 * @param {Array} arr 
 * @returns 
 */
export const getDataExtremes = (arr) => {
    return arr.reduce( ( prev, current, index ) => {
        return (
            //  first and last data points
            ( 
                index === 0 || index === arr.length - 1 
            )
            // If the point is unchanged, we want to display a straight line
            || ( 
                arr[index-1].y === current.y 
            )
            //  lowest dip in the current sequence
            || (
                current.y < arr[index-1].y && 
                current.y < arr[index+1].y 
            )
            //  peak in the current sequence
            || (
                current.y > arr[index-1].y &&
                current.y > arr[index+1].y
            )
        ) ? [ ...prev, current ] : prev;

    }, [] );
}
