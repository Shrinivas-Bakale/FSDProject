import React from 'react'
import { firebaseApp, database, useFirebase } from '../../pages/firebase/firebase'
import { getFirestore, collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc } from 'firebase/firestore'
import Loader from '../../assets/Animation - 1733212579288.gif'

const Example = () => {

    const firestore = getFirestore(firebaseApp)
    const { putData } = useFirebase()
    const { getDataFromRTDB } = useFirebase()

    console.log(database)


    const writeUserData = () => {
        return putData('users/shinu', {
            id: 2,
            name: 'shrinivas',
            age: 22
        }, "Successfully saved", "Failed to save")
    }

    const writeData = async () => {
        const result = await addDoc(collection(firestore, 'cities'), {
            name: 'Delhi',
            pincode: 67,
            lat: 123,
            long: 456,
        });
        console.log('Result: ', result)
    }

    const writeSubData = async () => {
        const result = await addDoc(collection(firestore, 'cities/JptDd6ZX58oIAivwLYfY/places'), {
            name: 'This is a place 2',
            desc: 'awsm',
            date: Date.now(),
        })
        console.log('Result: ', result)
    }

    const getDocument = async () => {
        const ref = doc(firestore, 'cities', 'JptDd6ZX58oIAivwLYfY');
        const docSnap = await getDoc(ref);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }

        const docRef = doc(firestore, "carts", "wj7sCKWPDkfXDNeo9XyuWKE2Z4q2");
        const docSnap2 = await getDoc(docRef);

        if (docSnap2.exists()) {
            console.log("Document data:", docSnap2.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }




    const getDocumentsByQuery = async () => {
        const collectionRef = collection(firestore, 'users');
        const q = query(collectionRef, where('isMale', '==', true));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((data) => { console.log(data.data()) })
    }

    const updateDocument = async () => {
        const docRef = doc(firestore, 'cities', 'JptDd6ZX58oIAivwLYfY');
        await updateDoc(docRef, {
            name: 'New Delhi'
        })
    }


    const putDataNew = () => {
        putData('root/a/b', { id: 1 });
    }


    const getDataRTDB = () => {
        getDataFromRTDB(
            'users/shinu',
            (data) => console.log("Successfully retrieved data:", data),
            (error) => console.log("Failed to retrieve data:", error)
        );
    };


    return (
        <div>
            <button onClick={writeData} className='typical-btn'>Firestore Data</button>
            <button onClick={writeSubData} className='typical-btn'>Firestore Sub Data</button>
            <button onClick={getDocument} className='typical-btn'>Get Data</button>
            <button onClick={getDocumentsByQuery} className='typical-btn'>Get Data By Query</button>
            <button onClick={updateDocument} className='typical-btn'>Update Doc By Id</button>
            <button onClick={writeUserData} className='typical-btn'>Database Data</button>
            <button onClick={putDataNew} className='typical-btn'>RealTime DataBase</button>
            <button onClick={getDataRTDB} className='typical-btn'>Get RealTime DataBase</button>

            <img src={Loader} alt="" />
        </div>
    )
}

export default Example
