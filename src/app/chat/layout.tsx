import React from 'react'

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <main className='h-dvh '>
        {children}
    </main>
  )
}

export default layout