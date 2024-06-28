<template>
    <div class="wrapper container">
    <form class="form">
        <p class="title">Registrati </p>
        <p class="message">Registrati per accedere ai vantaggi della nostra piattaforma. </p>
            <div class="flex">
            <label>
                <input class="input" type="text" placeholder="" required="">
                <span>Firstname</span>
            </label>
    
            <label>
                <input class="input" type="text" placeholder="" required="">
                <span>Lastname</span>
            </label>
        </div>
        <div class="flex">
            <label>
                <input class="input" type="text" placeholder="" required="">
                <span>Nome Attività</span>
            </label>  
            <label>
                <input class="input" type="text" placeholder="" required="">
                <span>indirizzo</span>
            </label> 
    
            
        </div>
        <label>
            <input class="input" type="text" placeholder="" required="">
            <span>Partita I.V.A</span>
        </label> 
                
        <label>
            <input class="input" type="email" placeholder="" required="">
            <span>Email</span>
        </label> 
            
        <label>
            <input class="input" type="password" placeholder="" required="">
            <span>Password</span>
        </label>
        <label>
            <input class="input" type="password" placeholder="" required="">
            <span>Confirm password</span>
        </label>
        <button class="submit">Registrati</button>
        <p class="signin">Hai già un acount ? <a href="#">Accedi</a> </p>
    </form> 
</div>
</template>

<script>
    export default {
        name: 'PartnerComponent'
    }
</script>

<style lang="scss" scoped>
body {
  background-image: url(immagini/Deliveboo_background.png);
  background-position: center;
  background-size: cover;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}

body{
  background-image: url(immagini/patternfood.webp);
  background-size: cover;
  background-position: center;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 1000px;
    background-color: rgb(253, 181, 22);
    padding: 20px;
    border-radius: 20px;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  


  .title {
    font-size: 28px;
    color: #B7450A;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }
  
  .title::before,.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #B7450A;
  }
  
  .title::before {
    width: 18px;
    height: 18px;
    background-color: #B7450A;
  }
  
  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }
  
  .message, .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
  }
  
  .signin {
    text-align: center;
  }
  
  .signin a {
    color: #B7450A;
  }
  
  .signin a:hover {
    text-decoration: underline #B7450A;
  }
  
  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }
  
  .form label {
    position: relative;
  }
  
  .form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }
  
  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }
  
  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }
  
  .form label .input:focus + span,.form label .input:valid + span {
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }
  
  .form label .input:valid + span {
    color: green;
  }
  
  .submit {
    border: none;
    outline: none;
    background-color: #B7450A;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
  }
  
  .submit:hover {
    background-color: #782800;
    cursor: pointer;
  }
  
  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }
  
    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
</style>