import React from 'react'

function SearchBar({ location, setLocation, handleFetchWeather }) {
    const handleOnChange = (e) => {
        setLocation(e.target.value)
    }
    const handleOnKeyUp = (e) => {
        console.log(e.key)
        if (e.key === 'Enter') {
            handleFetchWeather()
        }

    }
    return (
        <div className="py-4 flex justify-center items-center gap-4">
            <input
                className='border border-solid px-2 py-1 rounded-md'
                type='text'
                value={location}
                onChange={handleOnChange}
                onKeyUp={handleOnKeyUp}
                placeholder="Enter Location"
            />

            <button className='px-2 py-1 border border-solid bg-green-500 rounded-md' onClick={handleFetchWeather}>Search</button>


        </div>
    )
}

export default SearchBar