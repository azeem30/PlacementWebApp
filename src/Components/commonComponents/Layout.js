import React from 'react'
import '../cssfiles/layoutdesign.css'

export default function Layout({children}) {
  return (
    <div className='common-background'>
      {children}
    </div>
  )
}
