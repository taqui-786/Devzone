import React from 'react'

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <main className='min-h-dvh w-screen'>
        {children}
    </main>
  )
}

export default layout