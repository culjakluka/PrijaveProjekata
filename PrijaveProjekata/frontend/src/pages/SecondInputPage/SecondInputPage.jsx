import {useState} from 'react'
import SecondInputForm from '../../components/SecondInputForm/SecondInputForm'
// importing context that is going to manage SecondInputForm

const SecondInputPage = ( documentId ) => {

    return (
        <div className="SecondInputPage">
            <SecondInputForm docId={documentId}/>
        </div>
    )
}

export default SecondInputPage