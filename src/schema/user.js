import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: [true, 'Email already exists'],
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid Email address'
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
      match: [
        /[a-zA-Z0-9]+$/,
        'Username must contain only letters and numbers'
      ],
      minLength: [3, 'UserName must be at least 3 characters']
    },
    avatar: {
      type: String
    }
  },

  { timestamps: true }
);

userSchema.pre('save', function saveUser(next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const hashedPassword = bcrypt.hashSync(user.password, SALT);
  user.password = hashedPassword;
  user.avatar = `https://robohash.org/${user.username}`;
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
