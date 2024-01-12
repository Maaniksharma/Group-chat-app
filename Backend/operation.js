import mongoose from 'mongoose';
import users from './models/users.js';

async function addGroupsField() {
  const result = await users.updateMany(
    { groups: { $exists: false } },
    { $set: { groups: [] } }
  );

  console.log(`Updated ${result.nModified} documents`);

  await mongoose.disconnect();
}

addGroupsField().catch(console.error);
