function Validation(values){
    let error={}
     const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
          const passwordPatterm=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
console.log(values);
if (values.name==="")
{error.name="Name shouldnot be empty"}
else {error.name=""}


if (values.email==="")
     {error.email="Email shouldnot be empty"}
     else if (!emailPattern.test(values.email))
     {error.email="Email pattern not correct."}
     else 
     {error.email=""}

     if (values.password===""){error.password="Password required"}
     else if(!(passwordPatterm.test(values.password)))
     {error.password="Password should be complex"}
     else 
     {error.password=""}

     return error;
}
export default Validation;