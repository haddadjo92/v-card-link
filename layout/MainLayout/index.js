import { memo } from 'react'
// *** components ***


function MainLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

export default memo(MainLayout)