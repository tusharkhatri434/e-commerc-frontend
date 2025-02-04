const Tittle = (props) => {
    const {title1,title2} = props.text;
    
  return (
    <div className="text-center py-8 text-3xl">
        <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">{title1} 
               <span className="text-gray-700 font-medium">{title2}</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
            </p>
            </div>
  )
}

export default Tittle