import React from 'react'

export const Repository = ({name, data, onClick}) => {
    return (
        <button className='repo-button' value={JSON.stringify(data)} title={name} aria-label={name} onClick={(e) => {
            onClick?.(JSON.parse(e.target.value))
        }}>
            {name}
        </button>
    )
}
