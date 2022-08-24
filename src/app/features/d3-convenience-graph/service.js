
export const getMaxPoints = ( arr ) => {
    const r = [];

    for ( let i = 0; i < arr.length; i++) {
        if ( i === 0 || i === arr.length - 1 ) {
            continue;
        }

        if (arr[i].minRange < arr[i-1].minRange &&
            arr[i].minRange < arr[i+1].minRange
        ) {
            r.push(arr[i]);
        }
    }

    return r;
}

export const getDataExtremes = (arr) => {
    
    const r = [];

    for (let i = 0; i < arr.length; i++) {

        if ( i === 0 || i === arr.length - 1 ) {
            r.push(arr[i]);
            continue;
        }

        if ( arr[i-1].minRange === arr[i].minRange ) {
            r.push(arr[i]);
            continue;
        }

        //  get the lowest point on the graph
        if (    arr[i].minRange < arr[i-1].minRange && 
                arr[i].minRange < arr[i+1].minRange 
        ) {
            r.push(arr[i]);
            continue;
        }

        //  get highest point
        if (arr[i].minRange > arr[i-1].minRange &&
            arr[i].minRange > arr[i+1].minRange
        ) {
            r.push(arr[i]);
        }

    }

    return r;
}
