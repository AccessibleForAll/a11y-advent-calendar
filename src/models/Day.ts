import mongoose from 'mongoose';

const daySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    published: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Day = mongoose.models.Day || mongoose.model('Day', daySchema);

export default Day;
