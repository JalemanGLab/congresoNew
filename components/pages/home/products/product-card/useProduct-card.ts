import { useState } from "react"

  


const useProductCard = () => {
    
  
  const [isModalOpen, setIsModalOpen] = useState(false)

    return {
       isModalOpen,
       setIsModalOpen
    }

}


export default useProductCard