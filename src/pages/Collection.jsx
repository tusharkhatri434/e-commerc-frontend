import Title from "../components/Title"
import ProductItem from '../components/ProductItem';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../utils/url-config";

const categoriesFiltersObj = {men:true,women:false,kids:false};
const typeFilterObj  = {topwear:false,bottomwear:false,winterwear:false};

const Collection = () => {

  const [queryString,setQueryString] = useSearchParams();

  const typeParam = queryString.get("type");
  const typeArray = typeParam ? typeParam.split(',') : [];

  // console.log(typeArray);

  const categoriesParams = queryString.get("categories");
  const categoriesArray = categoriesParams ? categoriesParams.split(',') : [];

  // console.log(categoriesArray);

  const [isFilterOpen,setFilterOpen] = useState(false);

  const [fetchDataItems,SetFetchDataItems] = useState(null);
  const [filterProducts,setFilterProducts] = useState(null);

  const [categories,setCategories] = useState({men:false,women:false,kids:false});
  const [subCategories,setSubCategories] = useState( {topwear:false,bottomwear:false,winterwear:false});
  const [sortType,setSortType] = useState("");


   const fetchDataHandler = async ()=>{
    try {
      const data = await fetch(`${BASE_URL}/v1/api/products`);
      const res = await data.json();
      if(res.success){
        SetFetchDataItems(res.data);
        setFilterProducts(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
   }

   const changeUrlSearchQuery = (filterType,query)=>{
        let updatedQuery;
        if(filterType=="categories"){
          updatedQuery = categoriesArray.includes(query) ? categoriesArray.filter((item)=>item!==query) : [...categoriesArray,query];

          setQueryString({
            categories:updatedQuery.join(','),
            type:typeArray.join(',')
          });
        }
        if(filterType=="type"){
          updatedQuery = typeArray.includes(query) ? typeArray.filter(item=>item!=query) : [...typeArray,query];

          setQueryString({
            categories:categoriesArray.join(','),
            type:updatedQuery.join(',')
          });
          console.log("updated",updatedQuery);

        }
   }  

   const categoriesHandler = (value)=>{
       changeUrlSearchQuery("categories",value);
        if(!(categories[value])){
           setCategories({...categories,[value]:true});
           return;
        }
        setCategories({...categories,[value]:false});
   }

   const typeHandler = (value)=>{
    changeUrlSearchQuery("type",value);
      if(!(subCategories[value])){
        setSubCategories({...subCategories,[value]:true});
        return;
      }

      setSubCategories({...subCategories,[value]:false});
   }

  const setCategoriesHandler = ()=>{
    if(categoriesArray.length!==0){
        
      const categoriesFiltersObj = {men:false,women:false,kids:false};
        categoriesArray.map((item)=>{
          categoriesFiltersObj[item] = true;
        });

        console.log(categoriesFiltersObj);
        setCategories({...categoriesFiltersObj});

        const typeFilterObj = {topwear:false,bottomwear:false,winterwear:false};
        typeArray.map((item)=>{
          typeFilterObj[item] = true;
        });

        console.log(typeFilterObj);
        setSubCategories({...typeFilterObj});
    }
  } 

  const updateFilterPoducts = ()=>{
    let newProducts = [];
    const catValues = Object.values(categories);
    const subCatValues = Object.values(subCategories);

    if(catValues.includes(true) && subCatValues.includes(true)){
      newProducts = fetchDataItems?.filter((item)=>{
        const categoryName = item.category.toLowerCase();
        const subCategoryName = item.subCategory.toLowerCase();

         if((item.category && categories[categoryName]) && (item.subCategory && subCategories[subCategoryName])){
           return item;
         }
       });
       
       console.log(newProducts);
       setFilterProducts(newProducts);
       return;
    }

    if(catValues.includes(true)){
      console.log("i run 1");
      newProducts = fetchDataItems?.filter((item)=>{
        const categoryName = item.category.toLowerCase();
         if(item.category && categories[categoryName]){
           return item;
         }
       });
       setFilterProducts(newProducts);
       return ;
    }

    if(subCatValues.includes(true)){
      console.log("i run 2");
      newProducts = fetchDataItems?.filter((item)=>{
        const subCategoryName = item.subCategory.toLowerCase();
         if(item.subCategory && subCategories[subCategoryName]){
           return item;
         }
       });
       console.log(newProducts);
       setFilterProducts(newProducts);
       return;
     }

     console.log(newProducts);
     if(!fetchDataItems){
      return [];
     }
     setFilterProducts(fetchDataItems);
     return;
    }

  const sortHandler = (e)=>{
    console.log("i runninfdsf")
    const type = e.target.value;
    let newProducts;
    switch(type) {
      case "low-high": 
        newProducts = [...filterProducts].sort((a,b)=>a.price - b.price);
        console.log(newProducts);
        setFilterProducts([...newProducts]);
        break;

      case "high-low": 
         newProducts = [...filterProducts].sort((a,b)=>b.price - a.price);
        console.log(newProducts);
        setFilterProducts([...newProducts]);
        break;

      default :
      updateFilterPoducts();
    }

    setSortType(type);
  }

  useEffect(()=>{
    fetchDataHandler();
    setCategoriesHandler();
  },[]);

useEffect(()=>{
  updateFilterPoducts();
},[categories,subCategories,fetchDataItems]);

  if(!fetchDataItems){
    return;
  }

  console.log(categories);
  console.log(subCategories);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t-1 border-gray-200">
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img onClick={()=>setFilterOpen(!isFilterOpen)} className={`h-3 sm:hidden ${isFilterOpen ? "rotate-90":""}`} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAkCAYAAACJ8xqgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEJwAABCcASbNOjQAAAGASURBVEhLrZa7cYQwFEX5RiRbwpawLoEEhtAVeN2BOzCuxHYFJMzwSWjBJVCCIzLA74KQWRAgBGcG0GOGw9WHERrIsizM8/y9Kw6iJ0lyN03zk9Wh53kfrK2EQbywNgjxAtZWwqiq6pmuP32paUh7RKrjFEXRxXGcgpo31KCu69cgCL5YKU0nBGdJuRBQV6/UZUiv/Z390gchEEnbtn3yfZ+P8xoGu3IoTUmpXGqW/Z1OWNBa5UOxxizhwDRp0zS/uq67W0kXhUBFuioEe6WbQiCSYqIw3qjHzCZFxHSi6HO90FHgRajHSCUcmCallCWldcdJdwnBlnS3EKxJlYQgjuObZVkFxhP1IJWaFBG2bWu0fFj1j5IQXSZZRMdDOqUunzoppy4bGRmQEk5lJFr8njeFe2RgVbhXBhaFKjIgFKrKwEw4lQGaUbVNCnuzQHaXlQEuHG30U9k3K6Xouiz6a1CRAf1MGTDOlAGDlgR/mDaityMyDi2VME3TE36JNe0PEvQ33QXCa5oAAAAASUVORK5CYII=" alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${isFilterOpen ? "":"hidden"}`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2"><input onChange={()=>categoriesHandler("men")} className="w-3" checked={(categories.men) ? true:false} type="checkbox" value="Men" /> Men</p>
            <p className="flex gap-2"><input onChange={()=>categoriesHandler("women")} className="w-3" checked={(categories.women) ? true:false} type="checkbox" value="Women" /> Women</p>
            <p className="flex gap-2"><input onChange={()=>categoriesHandler("kids")} className="w-3" checked={(categories.kids) ? true:false} type="checkbox" value="Kids" /> kids</p>
          </div>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${isFilterOpen ? "":"hidden"}`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2"><input onChange={()=>typeHandler("topwear")} className="w-3" checked={(subCategories.topwear) ? true:false} type="checkbox" value="Topwear" /> Topwear</p>
            <p className="flex gap-2"><input onChange={()=>typeHandler("bottomwear")} className="w-3" checked={(subCategories.bottomwear) ? true:false} type="checkbox" value="Bottomwear" /> Bottomwear</p>
            <p className="flex gap-2"><input onChange={()=>typeHandler("winterwear")} className="w-3" checked={(subCategories.winterwear) ? true:false} type="checkbox" value="Winterwear" /> Winterwear</p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">ALL <span className="text-gray-700 font-medium">COLLECTIONS</span></p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
          <select onChange={sortHandler} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item)=><ProductItem key={item._id} data={item} />)}
        </div>
      </div>

    </div>
  )
}

export default Collection