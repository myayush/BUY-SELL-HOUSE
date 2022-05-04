import {useNavigate,useLocation} from "react-router-dom"
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
    const navigate = useNavigate()
    const location= useLocation()

    const pathmatch=(route)=>{
      if(route===location.pathname)
      {
        return true; 
      }
    }
  return (
      <footer className='navbar'>
        <nav className="navbarNav">
         <ul className="navbarListItems">

         <li className="navbarListItem" onClick={()=>navigate('/profile')}>
                 <PersonOutlineIcon fill={pathmatch('/profile')?'2c2c2c':'grey'} width='36px' height='36px'/>
                <p className={pathmatch('/profile') ? 'navbarListItemNameActive':'navbarListItemName'}>Profile</p>
             </li>
             <li className="navbarListItem" onClick={()=>navigate('/')} >
                 <ExploreIcon fill={pathmatch('/') ? '2c2c2c':'grey'} width='36px' height='36px' />
                 <p className={pathmatch('/') ? 'navbarListItemNameActive':'navbarListItemName'}>Explore</p>
             </li>
         </ul>

        </nav>
        
      </footer>
  )
}

export default Navbar;
