//a function that separates the elements of a string to identify the operation and give the resulte
function operation(text)
{
    for ( i = 0 ; i < (text.length - 1) ; i++ )
    {
        if (text[i]==="(")
        {
            let j = i;
            while ( text[j] != ")") j++;
            text[i]=operation(text.slice(i+1,j));
            text=text.toSpliced(i+1,j-i);
        }
    }

    for ( i = 0 ; i <= (text.length - 1) ; i++ ) 
    {
        if ( text [i] == "*" )
            {
                text[i-1] = String( Number(text[i-1]) * Number(text[i+1]) );
                text=text.toSpliced(i,2);   
            }
        if(text [i] == "/" )
            {
                text[i-1]=String( Number(text[i-1]) / Number(text[i+1]) );
                text=text.toSpliced(i,2);   
            }
    }


    let s = Number(text[0]);
    for( i = 0 ; i <= (text.length-1) ; i+=2 ) 
        { 

            switch(text[i+1])
            {
                case "+":
                    s+= Number(text[i+2]) ;
                    break;
                case "-":
                    s-= Number(text[i+2]) ;
                    break;
            }

        }
    return s;
}


function input_handler(input)
{
    let symboles="+-/*()";
    input = input.trim();
    input = input.replaceAll(" ","");
    for ( i = 0; i < input.length ; i++ )
    {
        if(isNaN(Number(input[i])) && symboles.indexOf(input[i])==-1) return "Syntax ERROR";
        if(symboles.indexOf(input[i])>=0 && symboles.indexOf(input[i+1])>=0) return "Syntax ERROR";
    }
    if(symboles.indexOf(input[0])>=0 || symboles.indexOf(input[input.length-1])>=0) return "Syntax ERROR";
    for( i = 0; i < (symboles.length); i++)
    {
        if(symboles.indexOf(input[i]))
        input = input.replaceAll(symboles[i]," "+symboles[i]+" ");
    }
    input = input.split(" ");
    return input;
}


const screen_input = document.querySelector(".screen > #input"); 
//moves focus to input a window loading
window.addEventListener('load',()=>{
    screen_input.focus();
}
);

const display=document.querySelector(".screen > #output");
const buttons = Array.from(document.querySelectorAll("button"));
let OrigninColorOfButton=buttons[0].style.background;
for ( i = 0; i < buttons.length; i++)
{
    if(i<buttons.length-1)
    {

        buttons[i].addEventListener("mousedown",
        function(e){
            e.target.style.background="#7A7A7A";
        }
            );
    }
    else
    {
        buttons[i].addEventListener("mousedown",
        function(e){
            e.target.style.background="#2BA100";
        }
            );
    }   
    buttons[i].addEventListener("mouseup",
    function(e){
        e.target.style.background=OrigninColorOfButton;
    }
        );

}

for ( i = 0; i < buttons.length; i++){
    if(i < buttons.length-1 && i>1)
    {
        buttons[i].addEventListener("click",function(e){
            screen_input.value+=e.target.textContent;
        }
            );
    }
    else if(i===1)
    {
        buttons[i].addEventListener("click",function(e){
            
            screen_input.value = "";
            display.textContent = "";
        }
            );
    }
    else if(i===0)
    {
        buttons[i].addEventListener("click",function(e){
            if(screen_input.value.length>0)
                screen_input.value = screen_input.value.substring(0,screen_input.value.length-1) ;
                
        }
            );
    }
    else 
    {
        buttons[i].addEventListener("click",function(e){
            display.textContent=operation(input_handler(screen_input.value));
        }
            );
    }


}





