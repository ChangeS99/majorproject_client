import { useState } from "react";

//styles
import { SearchBarCont } from "../../style/dashboard/content__styles";

const Search = ({ submitHandler, createHandler }) => {

    const [search, setSearch] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    }



    return (
        <SearchBarCont>
            <form className="searchbar_form">
                <div className="searchbar_form_component">
                    <input
                        value={search}
                        onChange={handleInputChange}
                        type="text" />
                    <button onClick={(e) => submitHandler(e, search)}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </form>
        </SearchBarCont>
    )
}

export default Search;