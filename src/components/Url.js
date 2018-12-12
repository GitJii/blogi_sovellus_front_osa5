import React from 'react'

const Url = ({ address }) => {
    if (address === null) {
        return null
    }
    return (<div className="url">
        {address}
    </div>
    )
}

export default Url