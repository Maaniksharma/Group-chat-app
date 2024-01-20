import users from '../../models/users.js';
import groups from '../../models/groups.js';

export default async (req, res) => {
  try {
    const metrics = {};
    const { from, to } = req.query;
    const fromDate = from ? new Date(from) : new Date(-8640000000000000); // Set to the earliest possible date if 'from' is not provided
    const toDate = to ? new Date(to) : new Date(864000000000000); // Set to the latest possible date if 'to' is not provided
    toDate.setDate(toDate.getDate() + 1); // Include the 'to' date in the range // Include the 'to' date in the range

    // Get all users
    // Get all users
    const usersData = await users.find().populate({
      path: 'groups',
    });

    // Map each user to an object that includes the user's name and the count of their messages
    const userMessageCounts = usersData.map((user) => {
      let messageCount = 0;
      user.groups.forEach((group) => {
        messageCount += group.messages.filter(
          (message) => message.at >= fromDate && message.at < toDate
        ).length;
      });
      return { userName: user.userName, count: messageCount };
    });

    // Sort the users by message count in descending order
    userMessageCounts.sort((a, b) => b.count - a.count);
    metrics.topUsers = userMessageCounts.slice(0, 5); // Get top 5 users

    // Get top 5 groups with the most messages
    const topGroups = await groups.aggregate([
      {
        $unwind: '$messages',
      },
      {
        $match: {
          'messages.at': {
            $gte: fromDate,
            $lt: toDate,
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          groupName: { $first: '$groupName' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 }, // Get top 5 groups
    ]);

    metrics.topGroups = topGroups;

    const topRegions = await users.aggregate([
      {
        $lookup: {
          from: 'groups',
          localField: 'groups',
          foreignField: '_id',
          as: 'groupData',
        },
      },
      {
        $unwind: '$groupData',
      },
      {
        $unwind: '$groupData.messages',
      },
      {
        $match: {
          'groupData.messages.at': {
            $gte: fromDate,
            $lt: toDate,
          },
        },
      },
      {
        $group: {
          _id: '$region',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    metrics.topRegions = topRegions;

    res.json({ metrics: metrics });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error' });
  }
};
