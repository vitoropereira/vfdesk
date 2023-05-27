'use client'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

// import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from '@/app/types'

import ClientOnly from './ClientOnly'
import useFavorite from '../hooks/useFavorite'
import { Favorite } from '@prisma/client'

interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  })

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        cursor-pointer
        transition
        hover:opacity-80
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          absolute
          -right-[2px]
          -top-[2px]
          fill-white
        "
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorited.length > 0 ? 'fill-rose-500' : 'fill-neutral-500/70'
        }
      />
    </div>
  )
}

export default HeartButton
