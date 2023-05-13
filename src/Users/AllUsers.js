import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserImage from '../AssignmentImage/User.png'
import './AllUsers.css'
export default function AllUsers() {
    const { User } = useSelector((state) => {
        return state.UserData;
    })
    const [TotalResult, setTotalResult] = useState(0)
    const [data, setData] = useState([])
    const [FindUserData, setFindUserData] = useState([])
    const [copyAllUserData, setCopyAllUserData] = useState([])
    const [count, setCount] = useState(1)
    const [show, setshow] = useState(false)
    const [message, setMessage] = useState("")
    const [Domain, setDomain] = useState([])
    const [Gender, setGender] = useState([])
    const [Availability, setAvailability] = useState([])
    const [filterkey, setFilterkey] = useState({ domain: "", gender: "", available: "" })
    const [searchValue, setSearchValue] = useState("")
    const [showClearFilter, setShowClearFilter] = useState(false)
    const [run, setrun] = useState(true)
    const [heading, setHeading] = useState("All User")

    let perpageResult = 20
    useEffect(() => {

        setTotalResult(FindUserData.length)
        setData(FindUserData.slice(perpageResult * count - 20, perpageResult * count))

    }, [FindUserData, count])

    useEffect(() => {
        if (User) {
            setFindUserData(User)
            setCopyAllUserData(User)

            let DomainValuearr = User.map((item) => {
                return item.domain;
            })
            let GenderValuearr = User.map((item) => {
                return item.gender;
            })
            let AvailableValuearr = User.map((item) => {
                return item.available;
            })

            setDomain([...new Set(DomainValuearr)])
            setGender([...new Set(GenderValuearr)])
            setAvailability([...new Set(AvailableValuearr)])
        }

    }, [User, run])


    //  Search LOgic 


    const SearchOnChangeHandle = (e) => {

        if (e.target.value != "") {
            setHeading("Search User By First Name and Last Name")
        }
        else {
            setHeading("All Users")
        }

        if (copyAllUserData.length > 0) {
            setSearchValue(e.target.value)
            setFilterkey({ domain: "", gender: "", available: "" })
            setCount(1)


            let arr = copyAllUserData.filter((item) => {

                if (item.first_name.toUpperCase().includes(e.target.value.toUpperCase()) || item.last_name.toUpperCase().includes(e.target.value.toUpperCase())) {

                    return item;
                }
            })

            if (arr.length == 0) {
                setshow(true)
                setMessage("User is not found")
            }
            else {
                setshow(false)
                setMessage("")
            }
            setFindUserData(arr)

        }
    }
    //  Filter Logic 

    useEffect(() => {
        if (copyAllUserData.length > 0) {
            if (filterkey.domain != "" || filterkey.available != "" || filterkey.gender != "") {


                setCount(1)
                setSearchValue("")
                setShowClearFilter(true)
                let arr = copyAllUserData.filter((item) => {



                    if (filterkey.gender != "" && filterkey.domain != "" && filterkey.available != "") {

                        if (item.domain == filterkey.domain && item.gender == filterkey.gender && String(item.available) == filterkey.available) {

                            if (filterkey.available == "true") {
                                setHeading(`${filterkey.domain} team ${filterkey.gender} Available  User`)


                            }
                            else {
                                setHeading(`${filterkey.domain} team ${filterkey.gender} not Available User`)
                            }
                            return item;

                        }
                    } else if (filterkey.gender == "" && filterkey.domain != "" && filterkey.available != "" ||
                        filterkey.gender != "" && filterkey.domain == "" && filterkey.available != "" ||
                        filterkey.gender != "" && filterkey.domain != "" && filterkey.available == "") {


                        if (filterkey.gender != item.gender && filterkey.domain == item.domain && filterkey.available == String(item.available)
                            || filterkey.domain != item.domain && filterkey.gender == item.gender && filterkey.available == String(item.available)
                            || filterkey.available != String(item.available) && filterkey.domain == item.domain && filterkey.gender == item.gender) {

                            if (filterkey.domain != "" && filterkey.gender != "") {
                                setHeading(`All ${filterkey.gender} ${filterkey.domain} team  User `)
                            }
                            if (filterkey.domain != "" && filterkey.available != "") {
                                if (filterkey.available == "true") {
                                    setHeading(`All Avaliable ${filterkey.domain} team User`)
                                }
                                else {
                                    setHeading(`All not Avaliable ${filterkey.domain} team User`)
                                }

                            }


                            if (filterkey.gender != "" && filterkey.available != "") {
                                if (filterkey.available == "true") {
                                    setHeading(`All Avaliable ${filterkey.gender} team User`)
                                }
                                else {
                                    setHeading(`All not Avaliable ${filterkey.gender} team User`)
                                }

                            }

                            return item;

                        }

                    }

                    else if (filterkey.gender != "" && filterkey.domain == "" && filterkey.available == "" ||
                        filterkey.gender == "" && filterkey.domain !== "" && filterkey.available == "" ||
                        filterkey.gender == "" && filterkey.domain == "" && filterkey.available != "") {


                        if (filterkey.gender == item.gender && filterkey.domain != item.domain && filterkey.available != String(item.available)
                            || filterkey.domain == item.domain && filterkey.gender != item.gender && filterkey.available != String(item.available)
                            || filterkey.available == String(item.available) && filterkey.domain != item.domain && filterkey.gender != item.gender) {

                            if (filterkey.domain != "") {
                                setHeading(`All ${filterkey.domain} team User `)

                            }
                            if (filterkey.gender != "") {
                                setHeading(`All ${filterkey.gender} team User `)

                            }
                            if (filterkey.available != "") {
                                if (filterkey.available == "true") {
                                    setHeading(`All Avaliable team User`)
                                }
                                else {
                                    setHeading(`All not Avaliable team User`)
                                }

                            }

                            return item;
                        }

                    }


                })
                if (arr.length == 0) {
                    setshow(true)
                    setMessage("User is not found")
                }
                else {
                    setshow(false)
                    setMessage("")
                }
                setFindUserData(arr)


            } else {
                setShowClearFilter(false)
                if (searchValue == "") {
                    setHeading(`All User `)
                }
            }

        }

    }, [filterkey])

    return (

        <>
            <div className='fillterbar'>

                <input type="search" className='searchInput' value={searchValue} placeholder='Search User first and Last Name' onChange={SearchOnChangeHandle} />
                <div>

                    <div>
                        <select name="" id="" value={filterkey.domain} onChange={(e) => {
                            setFilterkey({ ...filterkey, domain: e.target.value })


                        }}>
                            <option value="">choose Domain</option>
                            {
                                Domain.map((item, index) => {

                                    return <option value={item} key={index}>{item}</option>

                                })
                            }

                        </select>
                        <select name="" id="" value={filterkey.gender} onChange={(e) => {
                            setFilterkey({ ...filterkey, gender: e.target.value })


                        }}>
                            <option value="">choose Gender</option>
                            {
                                Gender.map((item, index) => {

                                    return <option value={item} key={index}>{item}</option>

                                })
                            }

                        </select>
                        <select name="" id="" value={filterkey.available} onChange={(e) => {
                            setFilterkey({ ...filterkey, available: e.target.value })



                        }}>
                            <option value="">choose Availability</option>
                            {
                                Availability.map((item, index) => {
                                    return <option value={item} key={index}>{item == true ? "Yes" : "No"}</option>

                                })
                            }

                        </select>
                    </div>


                    {
                        showClearFilter == true && <button onClick={() => {
                            setFilterkey({ domain: "", gender: "", available: "" })
                            setrun(!run)

                        }} className='clearFilterButton'> Clear Filter</button>
                    }

                </div>


            </div>

            {
                data.length > 0 && <>

                    <h1 className='MainHeading'>{heading}</h1>

                    <div className='UserCardContainer' >
                        {
                            data.map((item, index) => {






                                return <div key={index} className='UserCard' >
                                    <img src={item.avatar} alt="User Image" onError={(e) => {
                                        e.target.src = UserImage

                                    }} />
                                    <p> <span className='small_heading'>Name</span>&nbsp;:- {item.first_name}</p>
                                    <p> <span className='small_heading'>LastName</span>&nbsp;:- {item.last_name}</p>
                                    <p> <span className='small_heading'>Email</span>&nbsp;:- {item.email}</p>
                                    <p> <span className='small_heading'>Domain</span>&nbsp;:- {item.domain}</p>
                                    <p> <span className='small_heading'>Gender</span>&nbsp;:- {item.gender}</p>
                                    <p> <span className='small_heading'>Available</span>&nbsp;:- {item.available == true ? "Yes" : "No"}</p>

                                </div>
                            })
                        }
                    </div>



                    <div className='paginationBox'>




                        {
                            count > 1 &&
                            <button onClick={() => {
                                setCount(1)

                            }}>First</button>
                        }


                        {
                            count > 1 && <button onClick={() => { setCount(count - 1) }}>Previous</button>
                        }
                        <span className='pageNumber'>{count}</span>
                        {
                            count < Math.ceil(TotalResult / perpageResult) && <button onClick={() => {
                                setCount(count + 1)
                            }}> next</button>
                        }

                        {
                            count < Math.ceil(TotalResult / perpageResult) && <button onClick={() => {
                                setCount(Math.ceil(TotalResult / perpageResult))

                            }}>Last</button>
                        }
                    </div>
                </>
            }
            {show == true && <div className='Messagebox'> <p>{message}</p></div>}
        </>
    )
}

