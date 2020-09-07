import React from 'react'

const StateContext = React.createContext({
  notes: [],
  folders: []
})

export default StateContext