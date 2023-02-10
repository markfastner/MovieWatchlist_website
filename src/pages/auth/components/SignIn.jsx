import React from "react";
// import "../App.css";

export default function SignInPage() {
    return(
        <div>
            <div class="container">
        <div class="card">            
            <div class="card-header" style={{fontWeight:'bold'}}>Sign In</div>    
            <div class="card-body">
                <form action="/auth/login" method="GET">    
                        <label for="email-reg" class="form-label">Email</label>
                        <br></br>
                        <input type="text" style={{border: '3px solid rgba(0, 0, 0, 0.7)'}} class="form-control" id="email-reg" name="email"/>                        
                        <br></br>
                        <label for="password-reg" class="form-label">Password</label>
                        <br></br>
                        <input type="password" style={{border: '3px solid rgba(0, 0, 0, 0.7)'}}  class="form-control" id="password-reg" name="password"/>
                        <br></br>
                        <br></br>
                    <button type="submit" style={{background: 'black', color : 'white'}} class="btn btn-primary">Submit</button>
                    <br></br>
                    <a href='/signup'>Don't have an account? Sign Up!</a>
                </form>
            </div>
        </div>
    </div>
</div>
    )
}