import { GlassWater, Beer, Utensils } from "lucide-react";


const categories = [

{
title:"Granizados",
description:"Sabores refrescantes y combinaciones únicas.",
icon:GlassWater
},

{
title:"Micheladas",
description:"Preparaciones especiales para disfrutar.",
icon:Beer
},

{
title:"Snacks",
description:"Acompañamientos perfectos para tu bebida.",
icon:Utensils
}

];


function Categories(){


return(

<section className="py-20">


<div className="container px-6">


<h2 className="
text-4xl
font-bold
text-center
">

Categorías

</h2>



<div className="
grid
grid-cols-1
md:grid-cols-3
gap-8
mt-12
">


{
categories.map((category)=>{


const Icon = category.icon;


return(

<div
key={category.title}
className="
bg-white/5
border
border-white/10
rounded-2xl
p-8
text-center
hover:border-yellow-500
transition
"
>


<Icon
size={45}
className="
mx-auto
text-yellow-500
"
/>


<h3 className="
text-2xl
font-bold
mt-5
">

{category.title}

</h3>


<p className="
text-gray-400
mt-3
">

{category.description}

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


export default Categories;