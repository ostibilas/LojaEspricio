const bcrypt = require("bcrypt");

let senha = 'Senha-123';

const saltRounds = 10;

const senhaCriptografada = bcrypt.hashSync(senha, saltRounds);

const senhaValida = bcrypt.compareSync(senha, senhaCriptografada);

console.log('Senha Original:',senha);
console.log('Senha criptografada:',senhaCriptografada);

if(senhaValida){
    console.log('Senha válida!');

}else{
    console.log('Senha válida');
}