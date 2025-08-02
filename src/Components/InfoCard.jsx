import React from 'react'
import Tile from './Tile'


function InfoCard({ heading, data }) {
    if (data?.length === 0) return null;

    return (
        <div className='h-full flex flex-col justify-center items-center gap-2 border border-solid border-amber-900 p-4 rounded-xl shadow-2xl'>
            <h4 className='text-2xl font-bold'>{heading}</h4>
            {
                data?.map((item, index) => {
                    return <Tile key={item.value} label={item.label} value={item.value} />
                })
            }
        </div>
    )
}

export default InfoCard