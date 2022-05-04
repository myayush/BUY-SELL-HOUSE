import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Contact() {
  const [landlord, setLandlord] = useState(null)
  //eslint-disable-next-line

  const params = useParams()

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLandlord(docSnap.data())
      } else {
        toast.error('Could not get landlord data')
      }
    }
    getLandlord()
  }, [params.landlordId])


  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Owner's Contact Details</p>
      </header>

      {landlord !== null && (
        <main>
          <div >
            <p>Owner name :    {landlord?.name}</p>
            <p>Email Address :  {landlord?.email}</p>
          </div>
        </main>
      )}
    </div>
  )
}

export default Contact