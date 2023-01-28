import React from 'react'

export default function Login(){
    return(
        <div>
            <div class="container">
        <div class="card">            
            <div class="card-header" style={{fontWeight:'bold'}}>Sign Up</div>    
            <div class="card-body">
                <form action="/auth/register" method="POST">
                    
                        <label for="name-reg" class="form-label">Name</label>
                        <br></br>
                        <input type="text" style={{border: '3px solid rgba(0, 0, 0, 0.7)'}} class="form-control" id="name-reg" name="name"/>                        
                    
                        <br></br>
                        <label for="email-reg" class="form-label">Email</label>
                        <br></br>
                        <input type="text" style={{border: '3px solid rgba(0, 0, 0, 0.7)'}} class="form-control" id="email-reg" name="email"/>                        
                        <br></br>
                        <label for="password-reg" class="form-label">Password</label>
                        <br></br>
                        <input type="password" style={{border: '3px solid rgba(0, 0, 0, 0.7)'}}  class="form-control" id="password-reg" name="password"/>
                        <br></br>
                        <label for="password-conf-reg" class="form-label">Confirm Password</label>
                        <br></br>
                        <input type="password" style={{border: '3px solid rgba(0, 0, 0, 0.7)'}} class="form-control" id="password-conf-reg" name="password-confirm"/>
                    <br></br>
                    <button type="submit" style={{background: 'black', color : 'white'}} class="btn btn-primary">Submit</button>
                    <br></br>
                    <a href='/login'>Already have an account? Sign In.</a>
                </form>
            </div>
        </div>
    </div>
        </div>
    )
}