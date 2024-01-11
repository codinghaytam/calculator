//a function that separates the elements of a string to identify the operation and give the resulte
function operation(text)
{
    let s ;
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
            }
        if(text [i] == "/" )
            {
                text[i-1]=String( Number(text[i-1]) / Number(text[i+1]) );
            }
        text=text.toSpliced(i,2);   
    }
    s = Number(text[0])
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


let input = prompt();
input=input.trim();
input = input.split(" ");
console.log(input)
console.log(operation(input));