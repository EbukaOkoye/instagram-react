import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../../dexie'
import getPhotoUrl from 'get-photo-url'
import profileIcon from '../../assets/profileIcon.svg'
import './Bio.css'

function Bio() {

    const [editFormModal, setEditFormModal] = useState(false)

    const [profilePhoto, setProfilePhoto] = useState(profileIcon)

    const editButton = <button onClick={() => { setEditFormModal(true) }}>Edit</button>

    const [userDetails, setUserDetails] = useState({
        name: 'Chukwuebuka Ifenna Okoye',
        about: 'Building scalable applications for the web'
    })


    const updateProfilePhoto = async () => {
        // Get selected photo
        const newprofilePhoto = await getPhotoUrl('#addPhotoInput')  

        setProfilePhoto(newprofilePhoto)

        await db.bio.put(newprofilePhoto, 'profilePhoto')

    }



    const updatedetails = async (event) => {

        event.preventDefault();

        const objectData = {
            name: event.target.userName.value,
            about: event.target.userBioInfo.value,
        }

        setUserDetails(objectData)

        // Update bio with dexie stores
        db.bio.put(objectData, 'info')

        setEditFormModal(false)
    }

    useEffect(() => {
        const setDataFromDb = async () => {
            const getDataFromDb = await db.bio.get('info')
            const profilePhotoFromDb = await db.bio.get('profilePhoto')
            profilePhotoFromDb && setProfilePhoto(profilePhotoFromDb)
            getDataFromDb && setUserDetails(getDataFromDb)
        }
         
        setDataFromDb()
    })

    
   

    

    const editForm = (

        <form className='edit-bio-form' onSubmit={updatedetails}>

            <input type="text" id='' name='userName' defaultValue={userDetails?.name} placeholder='Your name' />

            <input type="text" id='' name='userBioInfo' defaultValue={userDetails?.about} placeholder='About you ' />
            <br />

            <button type='button' className='cancel-button' onClick={() => {setEditFormModal(false)}}>Cancel</button>

            <button type='submit' className='save-button'>Save</button>

        </form> 
    
    )





  return (
    <section className='bio'>

        <input type="file" accept='image/*' id="addPhotoInput" />

        <label htmlFor="addPhotoInput" onClick={updateProfilePhoto}>

            <div className="profile-photo" role='button' title='Click to edit photo'>

                <img src={profilePhoto} alt="Profile logo" />
            </div>

        </label>

        <div className="profile-info">
            <p className="name">{userDetails.name}</p>
            <p className="about">{userDetails.about}</p>

            {editFormModal ? editForm : editButton}
        </div>

    </section>
  )
}

export default Bio