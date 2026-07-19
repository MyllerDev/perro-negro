function SectionTitle({
title,
subtitle
}){


return(

<div className="
text-center
mb-12
">


<h2 className="
text-4xl
font-bold
">

{title}

</h2>


{
subtitle &&

<p className="
text-gray-400
mt-3
">

{subtitle}

</p>

}


</div>

)

}


export default SectionTitle;