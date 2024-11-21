import { Breadcrumbs,Link } from '@mui/material'
import React from 'react'

const BreadcrumbComponent = ({label}) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {
        label.map((el,index)=>{
          return <Link key={index} underline="hover" color={el.final?"text.primary":"inherit"} href={`/${el}`}>
            {el.label}
          </Link>
        })
      }
              {/* <Link underline="hover" color="inherit" href="/">
                Dashboard
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Product
              </Link>
              <Link
                underline="hover"
                color="text.primary"
                href="/material-ui/react-breadcrumbs/"
                aria-current="page"
              >
                Created
              </Link> */}
            </Breadcrumbs>
  )
}

export default BreadcrumbComponent
