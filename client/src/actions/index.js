import axios from 'axios';

export function getCountries() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/countries');
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        });
    };
};

export function filterByContinent (payload) {
    return {    
        type: 'FILTER_BY_CONTINENT',
        payload
    }
};

export function getActivities(){
    return async function(distpach){
    try {
        const allActivities = await axios.get("http://localhost:3001/activities");
        return distpach({
            type: 'GET_ACTIVITIES',
            payload: allActivities.data
        })
    } catch (error) {
        return(error)
    }       
    }
}

export function getCountriesName(payload) {
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/countries?name=' + payload);
            return dispatch({
                type: 'GET_COUNTRIES_NAME',
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}


export function filterActivity(payload){
    return {
            type: 'FILTER_ACTIVITY',
            payload
        }
};

export function orderByName (payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function filterByPopulation(payload) {
    return {
      type: "FILTER_BY_POPULATION",
      payload,
    };
  };