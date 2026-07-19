import { MessageCircle } from "lucide-react";


function WhatsAppButton(){


return(

<a

href="https://wa.me/573013791852"

target="_blank"

rel="noreferrer"

className="
fixed
bottom-6
right-6
bg-green-500
text-white
rounded-full
p-4
shadow-xl
hover:scale-110
transition
z-50
"

>

<MessageCircle size={28}/>

</a>

)

}


export default WhatsAppButton;