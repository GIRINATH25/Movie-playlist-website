const { default: mongoose } = require(`mongoose`);

const userSchema = mongoose.Schema(
    {
        email: {
            type : String,
            required: true,
        },
        password: {
            type : String,
            required: true,
        },
        token:{
            type: String
        }
    }
)

module.exports = mongoose.model(`users`, userSchema);