import { model, Schema } from 'mongoose'

const quizSchema: Schema = new Schema(
  {
    highscore: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export const Quiz = model('Quiz', quizSchema)