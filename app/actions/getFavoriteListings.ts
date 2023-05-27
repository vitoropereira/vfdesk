import prisma from '@/app/libs/prismadb'

import getCurrentUser from './getCurrentUser'

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return []
    }

    const userFavorites = await prisma.favorite.findMany({
      where: {
        userId: currentUser.id,
      },
    })

    const favoritesIds = userFavorites.map((favorite) => {
      return favorite.listingId
    })

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(favoritesIds || [])],
        },
      },
    })

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }))

    return safeFavorites
  } catch (error: any) {
    throw new Error(error)
  }
}
