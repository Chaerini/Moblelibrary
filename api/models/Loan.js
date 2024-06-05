import mongoose from 'mongoose';
const LoanSchema = new mongoose.Schema(
    {
        userid: {
            type: String,
            required: true,
        },
        bookid: {
            type: String,
            required: true,
        },
        loanDate: {
            type: String,
            required: true,
        },
        returnDate: {
            type: String,
            required: true,
        },
        loanStatus: {
            type: String,
            required: true,
        },
        extension: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Loan", LoanSchema);