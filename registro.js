const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const saltRounds = 10

const RegistroSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
})

RegistroSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this
        bcrypt.hash(document.password, saltRounds, (err, hashedPasword)=>{
            if (err) {
                next(err)
            }else{
                document.password = hashedPasword
                next()
            }
        })
    }else{
        next()
    }
})

RegistroSchema.methods.isCorrectPassword = fuction(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if (err) {
            callback(err)
        } else {
            callback(err, same)
            
        }
    })
}

module.exports = mongoose.model('User', RegistroSchema)
