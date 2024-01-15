import Image from 'next/image'

const placeHolderImage = 'https://resizing.flixster.com/gYPwvvezoP5wC4qMuQaexeWfXuk=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzBlYTYyMTM0LTVmNTEtNGJjYi05ZDAzLTc2MmMwNDBlYWFmMi53ZWJw'

const StoryCard = ({ name, src, profile}) => {
  return (
    <div className='relative w-12 h-12 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x-auto p-3 hover:animate-pulse transition duration-200 transform ease-in hover:scale-105'>
        <Image 
            className='absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10'
            src={profile ? profile : placeHolderImage}
            width={40}
            height={40}
            layout='fixed'
            objectFit='cover'
        />
        <Image 
            className='object-cover filter brightness-75 rounded-full lg:rounded-3xl'
            src={src ? src : placeHolderImage}
            layout='fill'
        />
    </div>
  )
}

export default StoryCard