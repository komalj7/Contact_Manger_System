import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div>
      <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
      <div className='container'>
        {/* navbar-brand :for merging the link */}
        <Link to={'/'} className='navbar-brand'><i className='fa fa-mobile text-warning'/>
        Contact<span className='text-warning'>Manager</span></Link>
      </div>
      </nav>
    </div>
  )
}
