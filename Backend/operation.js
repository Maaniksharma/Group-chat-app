import mongoose from 'mongoose';
import users from './models/users.js';
import bcrypt from 'bcrypt';

async function hashAllUserPasswords() {
  // Fetch all users
  const allUsers = await users.find({});

  // Iterate over each user
  for (let user of allUsers) {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Update the user's password
    user.password = hashedPassword;

    // Save the user back to the database
    await user.save();
  }

  await mongoose.disconnect();
}

hashAllUserPasswords().catch(console.error);
