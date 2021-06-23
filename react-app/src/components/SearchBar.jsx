// etsy api search call example:
// https://openapi.etsy.com/v2/listings/active.js?tags=shoes&limit=12&includes=MainImage:1&api_key=h6jf3au38z1loqmhogom8cet

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {searchProducts} from '../store/product'

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch()

    const handleSearch = async (e) => {
        e.preventDefault()
        const tags = searchTerm.replace(/\s/g, '') // remove whitespace regex
        dispatch(searchProducts(tags))
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    className="searchInput"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar
