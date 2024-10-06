const { User } = require('../models');


module.exports = {
    // Find all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .select('-__v');

            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Find specific user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('thought', 'friend');

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID.' })
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Create new user

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a user's username
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId },
                { $set: req.body }, { new: true });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add friend to user
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friend: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove friend from user
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friend: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}


