import React ,{useState} from 'react'

export default React.memo(()=> {
    const [name,setName]=useState('')
    return (
        <>
            <label htmlFor="name">
                <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={e=>setName(e.target.values)}
                onClick={e => e.target.setSelectionRange(0, e.target.value.length)}
                placeholder="Untitled"
                />
            </label>
            </>
    )
})

