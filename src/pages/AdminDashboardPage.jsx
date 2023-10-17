import React, { useCallback, useEffect } from "react";
import SnackBar from "../components/SnackBar";
import { GlobalContext } from "../globalContext";
import { Colors } from "../components/Colors";
import Videolisting from "../components/VideoList";
import { getAllVideos } from "../components/Apis/Video.servics";
import { useState } from "react";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'






const AdminDashboardPage = () => {
  const navigate= useNavigate()
  const { state, dispatch } = React.useContext(GlobalContext);
  const AuthState= React.useContext(AuthContext);

  const [Data, setData] = useState([])
  // console.log("🚀 ~ file: AdminDashboardPage.jsx:13 ~ AdminDashboardPage ~ Data:", Data)
  const [pageNo, setpageNo] = useState(0)
  const [total, setTotal] = useState(0)

//React DND
const moveCard = useCallback((dragIndex, hoverIndex) => {
  setData((prevCards) =>
    update(prevCards, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, prevCards[dragIndex]],
      ],
    }),
  )
}, [])
const renderCard = useCallback((card, index) => {
  return (
    <Videolisting
      key={card.id}
      index={index}
      id={card.id}
      data={card}
      moveCard={moveCard}
    />
  )
}, [])
  const getVideoData = async () => {
    const result = await getAllVideos({
      "payload": {},
      "page": pageNo,
      "limit": 10
    })
    if (result) {
      setData(result?.list)
      setTotal(result?.total)
    }
  }
 
  useEffect(() => {
    getVideoData()
  }, [URL])
  useEffect(() => {
    if (pageNo !== 0) {
      getVideoData()
    }
  }, [pageNo])

  return (
    <>
      <SnackBar />
      <div className="bg-[#111111] w-full   text-gray-700 p-5 ">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
          <h5 style={{ fontWeight: '700', color: "white", fontSize: '40px' }}>App</h5>
          <button onClick={() => { AuthState.dispatch({ type: "LOGOUT" });navigate('/')}} style={{ background: Colors.yellow, borderRadius: '30px', fontSize: '16px', padding: "5px 20px", color: 'black' }}> Log out</button>
        </div>
        <div className="mt-10">
          <div className="flex align-center justify-between gap-10 ">
            <h3 style={{ fontSize: '30px', color: "white" }} className="text-[20px]">Today's leaderboard</h3>
            <div className="flex align-center gap-3 " style={{ background: Colors.bg, borderRadius: '10px', alignItems: 'center', padding: '0px 20px', color: 'white' }}>
              <p>30 May 2022</p>
              <span></span>
              <p style={{ background: Colors.yellow, color: 'black', padding: '2px', borderRadius: "5px" }}>Submission Open</p>
              <p>11:34</p>
            </div>
          </div>
        </div>
        <DndProvider backend={HTML5Backend}>
        <div className="mt-10" >
          {
            Data?.map((item, index) => (

              renderCard(item, index)
            ))
             
              
            
          }

        </div>
        </DndProvider>

        {/* pagination */}
        <div style={{ display: "flex", gap: '20px', alignItems: 'center', justifyContent: "center", marginTop: '10px' }}>
          <button disabled={pageNo === 0 ? true : false} onClick={() => { pageNo > 0 && setpageNo(pageNo - 1) }} style={{ background: Colors.yellow, color: "black", padding: "5px 10px", borderRadius: '10px', fontSize: "20px" }}>

            Prev
          </button>
          <button onClick={() => {
            if (total > (pageNo * 10)) {
              setpageNo(pageNo + 1)
            }

          }} style={{ background: Colors.yellow, color: "black", padding: "5px 10px", borderRadius: '10px', fontSize: "20px" }}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
