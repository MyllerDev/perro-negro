function Badge({
  children,
  variant="default"
}){


const styles={

default:
"bg-yellow-500 text-black",

secondary:
"bg-white/10 text-white"

};


return(

<span

className={`
inline-flex
items-center
px-3
py-1
rounded-full
text-sm
font-semibold
${styles[variant]}
`}

>

{children}

</span>

)

}


export default Badge;