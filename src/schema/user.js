import mongoose from 'mongoose';
const userschema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email alredy exists'],
      match: [
        /^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
        'Please fill a valiid Email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    username: {
      type: String,
      required: [true, 'UserName is required'],
      unique: [true, 'Username already exists'],
      match: [/[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers']
    },
    avatar: {
      type: String
    }
  },

  { timestamps: true }
);

userschema.pre('save', function saveUser(next) {
  const user = this;
  user.avatar = `https://robohash.org/${user.avatar.username}`;
  next();
});

const User = mongoose.model(UserActivation, userschema);
export default User;
