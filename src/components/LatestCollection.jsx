import ProductItem from './ProductItem'

const LatestCollection = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
    {[1,2,3,4,5,6,7,8,9,10].map((v,i)=>{
      return (<ProductItem key={i} id={v}/>)})}
     </div>
  )
}

export default LatestCollection