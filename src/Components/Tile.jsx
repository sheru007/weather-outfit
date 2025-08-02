import React from 'react'

function Tile({ label, value }) {
    return (
        <div className='w-full flex justify-between items-center gap-4'>
            {label && <h5 className='text-base font-bold'>{label}</h5>}
            {value && <div>{value}</div>}
        </div>
    )
}

export default Tile