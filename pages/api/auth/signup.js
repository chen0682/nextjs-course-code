import { connectToDatabase } from '../../../lib/db'
import { hashPassword } from '../../../lib/auth'

export default async function handler(req, res) {
  const data = req.body

  const { email, password } = data

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 6
  ) {
    res.status(422).json({
      message:
        'Invalid Input - password should also be at least 6 characters long',
    })
    return
  }

  const client = await connectToDatabase()

  const db = client.db()

  const existingUser = await db.collection('users').findOne({ email })

  console.log({ existingUser })

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' })
    client.close()
    return
  }

  const hashedPassword = await hashPassword(password)

  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
  })

  res.status(201).json({ message: 'Created User!' })
  client.close()
}
