import { prisma } from '../src/lib/prisma'

async function main() {
  // Create Categories
  const fashion = await prisma.category.upsert({
    where: { slug: 'fashion' },
    update: {},
    create: {
      name: 'Fashion',
      slug: 'fashion',
      description: 'Premium clothing and apparel.',
    },
  })

  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Modern gadgets and premium devices.',
    },
  })

  // Create Products
  await prisma.product.upsert({
    where: { slug: 'classic-leather-watch' },
    update: {},
    create: {
      name: 'Classic Leather Watch',
      slug: 'classic-leather-watch',
      description: 'A timeless classic featuring genuine leather strap and minimal dial.',
      price: 15000,
      stock: 50,
      images: JSON.stringify(['/images/fashion.png']),
      categoryId: fashion.id,
    },
  })

  await prisma.product.upsert({
    where: { slug: 'silk-evening-gown' },
    update: {},
    create: {
      name: 'Silk Evening Gown',
      slug: 'silk-evening-gown',
      description: 'Elegant silk gown for special occasions.',
      price: 45000,
      stock: 10,
      images: JSON.stringify(['/images/fashion.png']),
      categoryId: fashion.id,
    },
  })

  await prisma.product.upsert({
    where: { slug: 'noise-cancelling-headphones' },
    update: {},
    create: {
      name: 'Premium Noise-Cancelling Headphones',
      slug: 'noise-cancelling-headphones',
      description: 'Immersive sound with active noise cancellation.',
      price: 35000,
      stock: 100,
      images: JSON.stringify(['/images/electronics.png']),
      categoryId: electronics.id,
    },
  })

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
