var user = document.getElementById('user'),
    psw = document.getElementById('psw'),
    msg = document.getElementById('msg'),
    login_btn = document.getElementById('login_btn');

login_btn.addEventListener('click', login);
user.addEventListener('keyup', login);
psw.addEventListener('keyup', login);

function login(e) {
  if(e && e.key && e.keyCode !== 13) return;
  if(!user.value) {user.focus(); return; }
  if(!psw.value) {psw.focus(); return; }
  console.log(user.value);
  console.log(psw.value);
}