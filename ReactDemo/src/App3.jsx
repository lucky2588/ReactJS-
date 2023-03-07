import React, { useEffect, useState } from 'react'


function App3() {
    const [crTitle, setTitle] = useState('posts');
    const [currentConent, setContent] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`https://jsonplaceholder.typicode.com/${crTitle}`)
            const cvData = await data.json();
            setContent(cvData)
        }
        fetchData();
    }
        , [currentConent]
    )

    return (
        <div>
            <button onClick={() => setTitle("posts")}>Posts</button>
            <button onClick={() => setTitle("photos")}>Photos</button>
            <button onClick={() => setTitle("albums")}>Albums</button>

            <ul>
                {
                    currentConent.map((e, index) => (<li key={index}>{e.title}</li>))
                }
            </ul>
        </div>
    )
}

export default App3