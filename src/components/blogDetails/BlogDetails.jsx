import React from 'react'
import './blogDetails.scss'
import Strutur from '../BlogShopSturuktur/Strutur'
import Navbar from '../Navbar/Navbar'

const BlogDetails = () => {
  return (
    <>
        <Navbar />
        <Strutur details={true} />
    </>
  )
}

export default BlogDetails