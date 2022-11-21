import getPhotoUrl from 'get-photo-url'
import dexie from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../../dexie'
import React, { useEffect, useState } from 'react'
import imageLoader from '../../assets/Ghost.gif'
import './Gallery.css'


function Gallery() {
    const allphotos = useLiveQuery( () => db.gallery.toArray(), [])

    const addPhoto = async () => {

        db.gallery.add( {
            url: await getPhotoUrl('#addPhotoInput')
        })

    }

    const removePhotos = (id) => {
        db.gallery.delete(id)
    }

   



  return (
    <>
        <input type="file" name="photo" id="addPhotoInput" />

        <label htmlFor="addPhotoInput" onClick={addPhoto }>
            <i className='add-photo-button fa fa-plus-square'></i>
        </label>

        <section className='gallery'>

            {!allphotos && <div className='load'><img src={imageLoader} /> </div>}

            {allphotos?.map((photo) => (

                <div className="item" key={photo.id}>

                    <img src={photo.url} className='item-image' alt="picture1" />

                    <button className='delete-button' onClick={() => removePhotos(photo.id)}>Delete</button>
                </div>
                
            ))}

            

            

        </section>
    </>
  )
}

export default Gallery