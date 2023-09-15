import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import './search.css';


const Search = ({onSearchChange}) => {

    const [search, setSearch]=useState(null);
    
    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${GEO_API_URL}/cities?minPolulation=30000&namePrefix=${inputValue}`, geoApiOptions);
            const result = await response.json();
            
            const options = result.data.map(city => ({
                value: `${city.latitude} ${city.longitude}`,
                // value: city.id,
                label: `${city.name}, ${city.countryCode}`
            }));
            
            return { options }; // Επιστροφή αντικειμένου με πεδίο "options"
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleOnChange = (searchData)=>{
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return ( 
        <div className="search-wrapper">
            <AsyncPaginate className='search' placeholder='Search for city'
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            />
        </div>
     );
}
 
export default Search;