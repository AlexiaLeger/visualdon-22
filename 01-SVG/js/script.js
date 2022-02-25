var click = false;
function changeCouleur(){
    if (click == false) {
        document.getElementById('rectangle').setAttribute('fill','green');
        click = true;
    }else{
        document.getElementById('rectangle').setAttribute('fill','blue');
        click = false;
    }
}