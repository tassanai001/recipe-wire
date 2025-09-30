import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testDatabaseOperations() {
  console.log('Testing database operations...')

  try {
    // Test 1: Create a user
    console.log('1. Creating a test user...')
    const newUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        passwordHash: 'hashed_password_placeholder',
        displayName: 'Test User'
      }
    })
    console.log('✓ User created:', newUser.email)

    // Test 2: Read the user
    console.log('2. Reading the test user...')
    const user = await prisma.user.findUnique({
      where: { id: newUser.id }
    })
    console.log('✓ User retrieved:', user?.email)

    // Test 3: Update the user
    console.log('3. Updating the user...')
    const updatedUser = await prisma.user.update({
      where: { id: newUser.id },
      data: { displayName: 'Updated Test User' }
    })
    console.log('✓ User updated:', updatedUser.displayName)

    // Test 4: List users
    console.log('4. Listing all users...')
    const users = await prisma.user.findMany()
    console.log(`✓ Found ${users.length} users in the database`)

    // Test 5: Delete the test user
    console.log('5. Deleting the test user...')
    await prisma.user.delete({
      where: { id: newUser.id }
    })
    console.log('✓ User deleted')

    console.log('✓ All database operations completed successfully!')
  } catch (error) {
    console.error('✗ Database operation failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the test
testDatabaseOperations()