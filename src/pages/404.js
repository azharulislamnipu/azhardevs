import React, { Component } from 'react'
import { IoMdSad , IoMdHeart, IoIosHome} from "react-icons/io";
export default class Erorr extends Component {
  render() {
    return (
     
        <div className="accountbg">
        <div className="wrapper-page">

            <div className="card">
                <div className="card-block">

                    <div className="ex-page-content text-center">
                        <h1 className="">4<IoMdSad className='text-primary error-icon'/>4!</h1>
                        <h4 className="">Sorry, page not found</h4><br/>

                        <a className="btn btn-primary mb-5 waves-effect waves-light" href="/dashboard"> <IoIosHome className='mt--6' /> Back to Dashboard</a>
                    </div>

                </div>
            </div>

            <div className="m-t-40 text-center text-white-50">
                <p>© 2020 Portfolio. Crafted with <IoMdHeart className='text-danger'/> by Azhardevs</p>
            </div>

        </div>
      </div>
    )
  }
}
