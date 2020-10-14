const validator = require('validator');
const isEmpty = require('./is-empty')
module.exports = function validatePostInput(data){
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text:'';
  
  if(validator.isEmpty(data.text)){errors.text = 'Text is required'}
  if(!validator.isLength(data.text,{min:5,max:300})) {errors.text = 'Post must be between 5 to 300 characters'}
  
  return {
    errors,
    isValid:isEmpty(errors)
  };
}