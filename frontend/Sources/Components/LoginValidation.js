function validation(email,password){
 
 let error={};
 const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
 const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
 if(email===""){
    error.email="Email should not  be empty"
 }
 else if(!email_pattern.test(email)){
    error.email="Email Disn't match"
 }
 else{
    error.email=""
 }

 if(password==="")
 {
    error.password="Password should not  be empty"
 }
 else if(!password_pattern.test(password)){
    error.password="Password isn't strong enough"
 }
 else{
    error.password=""
 }
 return error;
}
export default validation;