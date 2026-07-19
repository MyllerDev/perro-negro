const testimonials=[

{
name:"Carlos",
text:"Excelente sabor, recomendado totalmente."
},

{
name:"María",
text:"Las mejores micheladas del sector."
},

{
name:"Juan",
text:"Siempre buena atención y calidad."
}

];


function Testimonials(){


return(

<section className="py-20">


<div className="container px-6">


<h2 className="
text-4xl
font-bold
text-center
">

Clientes felices

</h2>



<div className="
grid
grid-cols-1
md:grid-cols-3
gap-8
mt-12
">


{
testimonials.map((item)=>(


<div

key={item.name}

className="
bg-white/5
border
border-white/10
rounded-2xl
p-6
"

>


<p className="
text-gray-300
italic
">

"{item.text}"

</p>


<h3 className="
mt-5
font-bold
text-yellow-500
">

{item.name}

</h3>


</div>


))

}


</div>


</div>


</section>

)

}


export default Testimonials;