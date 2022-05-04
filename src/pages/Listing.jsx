import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])


function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [navigate, params.listingId])

  if (loading) {
    return <Spinner />
  }

  return (
    <main>
     
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imgUrls.map((url, index) => (
         <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='swiperSlideDiv'
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
     
      <div className='listingDetails'>
        <p className='listingName'>
          Price- 
          Rs {listing.price}
        </p>
        <p className='listingLocation'>Address-{listing.address}</p>
        <ul className='listingDetailsList'>
          <li>
            {
             `${listing.bedrooms} Bedrooms
            `}
          </li>
          <li>
            {
              `${listing.bathrooms} Bathrooms`
            }
          </li>
          <li>{listing.parking && 'With Parking Spot'}</li>
          <li>
            {
              `City : ${listing.city} `
            }
          </li>
          
        </ul>
        <a target="_blank" href={listing.googlemaplocation}>
            <strong>Google Maps location link </strong>
        </a>
           
       
        
        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}`}
            className='primaryButton'
          >
            Want to contact Landlord?
          </Link>
        )}


      </div>
    </main>
  )
}

export default Listing

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat