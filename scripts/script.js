
function is_NaN(text)
{
    if(isNaN(Number(text)) && text!=".")return true;
    else return false;
}
//a function that separates the elements of a string to identify the operation and give the resulte
function operation(text)
{
    if (typeof(text)=="string")return text;
    for ( i = 0 ; i < (text.length - 1) ; i++ )
    {
        if (text[i]==="(")
        {
            let j = i;
            while ( text[j] != ")") j++;
            text.splice(i,j-i+1,operation(text.slice(i+1,j)));
          
        }
        if (text[i]==="^" )
        {

            text[i-1]=Math.pow(Number(text[i-1]),Number(text[i+1]));
            text.splice(i,2);
        }
    }
   
    for ( i = 0 ; i < (text.length - 1) ; i++ ) 
    {
        if ( text [i] === "*" )
            {
                text[i-1] = String( Number(text[i-1]) * Number(text[i+1]) );
                text.splice(i,i+1);
                i--;   
            }
        if(text [i] === "/" )
            {
                if(Number(text[i+1])!=0)
                {
                    text[i-1]=String( Number(text[i-1]) / Number(text[i+1]) );
                    text.splice(i,i+1);
                    i--;
                }   
                else return "MATH error";
            }
    }
    let s = Number(text[0]);
    for( i = 0 ; i <= (text.length-1) ; i++ ) 
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
    let symboles = "+-/*^()";
    input = input.trim();
    input = input.replaceAll(" ","");
    for ( i = 1; i < input.length-1 ; i++ )
    {
        if(is_NaN(input[i]) && symboles.indexOf(input[i])<0) { return "Syntax ERROR 1"};
        if(symboles.indexOf(input[i])>=0 && input[i+1]!="(" && isNaN(Number(input[i+1])) && input[i]<input.length) { return "Syntax ERROR 2";}
        
        if(input[i]==".")
        {
            if(isNaN(Number(input[i+1])) || isNaN(Number(input[i-1])))return "Syntax ERROR 3";
        }
    }
    if((symboles.indexOf(input[0])>=0 && input[0]!="-"&& input[0]!="(" ) || (symboles.indexOf(input[input.length-1])>=0 && input[input.length-1]!=")")) return "Syntax ERROR 4";
    if(symboles.indexOf(input[input.length-1])<0 && isNaN(Number(input[input.length-1])))return "Syntax ERROR 6";
    if(input[0]==".")return "Syntax ERROR 5";
    for( i = 0; i < symboles.length; i++)
    {
        if(symboles[i]=="(" ) {input = input.replaceAll("(","( ");}
        else if(symboles[i]==")") {input = input.replaceAll(")"," )");} 
        else {input = input.replaceAll(symboles[i]," "+symboles[i]+" ");}
    }

    input = input.split(" ");
    for ( i = 0; i < input.length-1 ; i++ )
    {
        if(isNaN(Number(input[i])) && symboles.indexOf(input[i])<0){return "Syntax ERROR";}
    }
    
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
    buttons[i].addEventListener("mouseleave",
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





