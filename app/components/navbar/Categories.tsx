'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import CategoryBox from '../CategoryBox'
import Container from '../Container'
import { categories } from '@/app/utils/categories'

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()
  const isMainPage = pathname === '/'

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div
        className="
          flex
          flex-row 
          items-center 
          justify-between 
          overflow-x-auto
          pt-4
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
