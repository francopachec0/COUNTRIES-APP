const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  details: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload
      };
      case 'FILTER_BY_CONTINENT':
        const allCountries = state.allCountries;
        const continentFiltered = action.payload === "All" ? allCountries : allCountries.filter(el => el.continent === action.payload)
        return {
          ...state,
          countries: continentFiltered
        };
        case 'GET_COUNTRIES_NAME':
          return {
            ...state,
            countries: action.payload
          }
        case 'ORDER_BY_NAME':            
        let sortedArray = action.payload === 'asc' ?
          state.countries.sort(function(a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          }) :
          state.countries.sort(function(a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          });
            return{
                ...state,
                countries: sortedArray
            }
            case "FILTER_BY_POPULATION":
              let filterByPopulation =
                action.payload === "big-countries"
                  ? state.countries.sort((a, b) => {
                      return b.population - a.population;
                    })
                  : state.countries.sort((a, b) => {
                      return a.population - b.population;
                    });
              return {
                ...state,
                countries: filterByPopulation,
              };
              case 'POST_ACTIVITY':
                return {
                  ...state
                };
              case 'GET_DETAILS':
                return {
                  ...state,
                  details: action.payload
                }
              case 'GET_ACTIVITIES':
                return{
                    ...state,                    
                    activities: action.payload                
                };     
                case 'FILTER_ACTIVITY':
                  const filterActivity = state.allCountries;
      const activity =
        action.payload === "All"
          ? filterActivity.filter((country) => country.activities.length > 0)
          : filterActivity.filter(
              (country) =>
                country.activities &&
                country.activities
                  .map((activity) => activity.name)
                  .includes(action.payload)
            );
      return {
        ...state,
        countries: activity,
      };
    default:
      return state;
  };
};

export default rootReducer;
