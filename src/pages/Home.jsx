import BestSeller from "../components/BestSeller"
import Hero from "../components/Hero"
import LatestCollection from "../components/LatestCollection"
import NewsLetterBox from "../components/NewsLetterBox"
import OurPolicy from "../components/OurPolicy"
import Tittle from "../components/Tittle"

const Home = () => {
  return (
    <div>
      <Hero />
      <Tittle text={{title1:"LATEST",title2:"COLLECTIONS"}} />
      <LatestCollection />
      <Tittle text={{title1:"Best",title2:"Seller"}} />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}

export default Home