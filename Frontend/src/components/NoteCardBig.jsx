import React from 'react'

function NoteCardBig({note}) {
  return (
    // background
    <div> 
      {/* inside */}
        <div>
          <h1>{note.title}</h1>
        </div>
    </div>
  )
}

export default NoteCardBig