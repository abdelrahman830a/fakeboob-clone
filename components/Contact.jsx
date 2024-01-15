import Image from 'next/image'

const Contact = ({name , src}) => {
  return (
    <div className='flex items-center space-x-3 mb-2 relative cursor-pointer p-2 rounded-xl hover:bg-gray-200'>
      <Image 
        className="rounded-full"
        objectFit="cover"
        src={src}
        width={40}
        height={40}
        layout="fixed"
      />
      <p className=''>{name}</p>
      <div className='absolute bottom-2 left-7 bg-green-500 h-3 w-3 rounded-full animate-bounce'/>
    </div>
  )
}

export default Contact