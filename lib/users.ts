// lib/users.ts
import bcrypt from 'bcryptjs';

export type User = {
  id: string;
  email: string;
  password: string; // this will be hashed
  name?: string;
};

// In-memory database (we'll replace with real DB later)
let users: User[] = [];

export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = await bcrypt.hash(password, 12); // 12 rounds = secure

  const newUser: User = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    password: hashedPassword,
    name,
  };

  users.push(newUser);
  return newUser;
}

export async function findUserByEmail(email: string) {
  return users.find(user => user.email === email.toLowerCase());
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

// Add this at the end of lib/users.ts
export async function registerTestUser() {
  const existing = await findUserByEmail('test@example.com');
  if (!existing) {
    await createUser('test@example.com', 'password123', 'Test User');
    console.log('✅ Test user created: test@example.com / password123');
  }
}