import Image from 'next/image'
import Hello from './home/01_hello/Hello'
import Whoami from './home/02_whoami/Whoami'
import Dual3D from './home/04_dual3D/Dual3D'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hello/>
      <Whoami/>
      <Dual3D/>
    </main>
  )
}
