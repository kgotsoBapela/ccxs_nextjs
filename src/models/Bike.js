import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    bikePic: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'not available', 'maintanance'],
      default: 'available',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Bike || mongoose.model('Bike', bikeSchema);