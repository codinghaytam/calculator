//a function that separates the elements of a string to identify the operation and give the resulte
function operation(text)
{
    console.log(text);
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
    console.log(text);
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
    console.log(text);

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
        if(symboles)
        input = input.replaceAll(symboles[i]," "+symboles[i]+" ");
    }
    input = input.split(" ");
    return input;
}

