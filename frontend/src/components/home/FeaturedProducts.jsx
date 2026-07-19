import ProductCard from "../products/ProductCard";
import SectionTitle from "../common/SectionTitle";

import { products } from "../../constants/products";


function FeaturedProducts(){


return(

<section className="py-20">


<div className="container px-6">


<SectionTitle

title="Productos destacados"

subtitle="Los favoritos de nuestros clientes"

/>



<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-8
">


{
products.map(product=>(

<ProductCard

key={product.id}

product={product}

/>

))

}


</div>


</div>


</section>

)

}


export default FeaturedProducts;