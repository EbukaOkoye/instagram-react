import dexie, { Dexie } from 'dexie'


export const db = new Dexie('insta-clone')
db.version(1).stores({
    bio: ',name, bio',
    gallery: '++id, url',
})