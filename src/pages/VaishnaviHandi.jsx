import React, { useState } from 'react'

const VaishnaviHandi = () => {
  const hello = () => { console.log("helo") }
  const [counter, setCounter] = useState(0)
  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>
        Add in counter
      </button>
      <p>
        {counter}
      </p>
    </div>
  )
}

export default VaishnaviHandi
