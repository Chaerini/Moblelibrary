import mongoose from "mongoose";
const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        releaseDate: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        availability: {
            type: Boolean,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        page: {
            type: Number,
            required: true,
        },
        publisher: {
            type: String,
            required: true,
        },
        loanCount: {
            type: Number,
            required: true,
            default: 0,
        },
        arrivalDate: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        }
    },
    { timestamps: true },
);

export default mongoose.model("Book", BookSchema);