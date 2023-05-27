import { NextResponse } from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

interface IParams {
  listingId?: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  const favoriteIds = await prisma.favorite.findMany({
    where: {
      userId: currentUser.id,
      listingId,
    },
  })

  if (favoriteIds.length > 0) {
    return NextResponse.json(favoriteIds)
  }

  const createFavorite = await prisma.favorite.create({
    data: {
      userId: currentUser.id,
      listingId,
    },
  })

  return NextResponse.json(createFavorite)
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  const favoriteIds = await prisma.favorite.findMany({
    where: {
      userId: currentUser.id,
      listingId,
    },
  })

  if (favoriteIds.length === 0) {
    return NextResponse.json(favoriteIds)
  }

  const deleteFavoriteIds = await prisma.favorite.delete({
    where: {
      id: favoriteIds[0].id,
    },
  })

  return NextResponse.json(deleteFavoriteIds)
}
