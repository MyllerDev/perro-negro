import {
ShieldCheck,
Truck,
Sparkles,
HeartHandshake
} from "lucide-react";


const benefits=[

{
title:"Calidad",
description:"Ingredientes seleccionados.",
icon:Sparkles
},

{
title:"Pago seguro",
description:"Compra protegida.",
icon:ShieldCheck
},

{
title:"Atención rápida",
description:"Siempre disponibles.",
icon:HeartHandshake
},

{
title:"Entrega",
description:"Servicio eficiente.",
icon:Truck
}

];



function Benefits(){


return(

<section className="py-20 bg-white/5">


<div className="container px-6">


<h2 className="
text-4xl
font-bold
text-center
">

¿Por qué elegirnos?

</h2>



<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
mt-12
">


{
benefits.map((item)=>{


const Icon=item.icon;


return(

<div
key={item.title}
className="
text-center
p-6
"
>


<Icon

size={40}

className="
mx-auto
text-yellow-500
"

/>


<h3 className="
text-xl
font-bold
mt-4
">

{item.title}

</h3>


<p className="
text-gray-400
mt-2
">

{item.description}

</p>


</div>

)


})

}


</div>


</div>


</section>

)

}


export default Benefits;