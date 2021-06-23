// etsy api search call example:
// https://openapi.etsy.com/v2/listings/active.js?tags=shoes&limit=12&includes=MainImage:1&api_key=h6jf3au38z1loqmhogom8cet

import React, { useState } from "react";

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        const apiKey = "h6jf3au38z1loqmhogom8cet"
        const tags = searchTerm.replace(/\s/g, '') // remove whitespace regex
        const apiURL = `https://openapi.etsy.com/v2/listings/active?api_key=${apiKey}&tags=${searchTerm}&limit=50&includes=MainImage`

        const res = await fetch(`/api/search/${tags}`)
        const data = await res.json()
        console.log(data)
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
